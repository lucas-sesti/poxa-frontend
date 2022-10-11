import { stringify } from "qs";
import axios, { AxiosRequestConfig } from "axios";
import JwtDecode from "jwt-decode";
import { environment } from "../environment/environment";

/** Representa um par de tokens */
export interface Token {
  accessToken: string;
  refreshToken: string;
}

/** Configurações do cliente */
export interface OAuthClientOptions {
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
  storage?: OAuthStorage;
}

/** Interface para estratégia de armazenamento de tokens */
export interface OAuthStorage {
  get(): Token;

  save(token: Token): Token;

  clear(): void;
}

/** Interface de função para requisição de grantTypes customizados */
export type OAuthGrant = (
  request: AxiosRequestConfig,
  options?: OAuthClientOptions
) => AxiosRequestConfig;

/**
 * Obtém um token utilizando login e senha
 * @param username nome de usuário
 * @param password senha
 * @param scopes escopos do token
 */
export function PasswordGrant(username: string, password: string): OAuthGrant {
  return (request) => ({
    ...request,
    data: stringify({
      grant_type: "password",
      username,
      password,
    }),
  });
}

/**
 * Obtém um novo token de acesso utilizando um token de atualização
 * @param refreshToken token de atualização
 */
export function RefreshTokenGrant(refreshToken: string): OAuthGrant {
  return (request) => ({
    ...request,
    data: stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
}

interface TokenPayload {
  sub: string;
  exp: number;
}

/**
 * Cria um cliente OAuth para gerenciar tokens
 */
export class OAuthClient {
  public readonly options: Required<OAuthClientOptions>;

  tokenRequest: Promise<any> | null = null;
  offset = 0;

  constructor(options: OAuthClientOptions) {
    const _accessTokenKey = "roledopoxa_act";
    const _refreshTokenKey = "roledopoxa_rft";

    this.options = {
      storage: {
        get() {
          return {
            accessToken: localStorage.getItem(_accessTokenKey) as string,
            refreshToken: localStorage.getItem(_refreshTokenKey) as string,
          };
        },
        save(token: Token) {
          localStorage.setItem(_accessTokenKey, token.accessToken);
          localStorage.setItem(_refreshTokenKey, token.refreshToken);
          return token;
        },
        clear() {
          localStorage.removeItem(_accessTokenKey);
          localStorage.removeItem(_refreshTokenKey);
        },
      },
      ...options,
    };
  }

  get accessToken() {
    return this.options.storage.get().accessToken;
  }

  get refreshToken() {
    return this.options.storage.get().refreshToken;
  }

  get tokenPayload(): TokenPayload | null {
    try {
      return JwtDecode(this.accessToken) as TokenPayload;
    } catch (err) {
      return null;
    }
  }

  get isTokenExpired() {
    const exp = (this.tokenPayload?.exp ?? 0) * 1000;
    return Date.now() - this.offset >= exp;
  }

  async isAuthenticated() {
    if (this.tokenPayload !== null) {
      await this.fetchOrRefreshAccessToken();
      return true;
    }
    return false;
  }

  async updateOffset() {
    const serverDate = await axios
      .get(`${process.env.baseURL}/oauth/time`)
      .then((res) => res.data.time)
      .catch(() => 0);

    this.offset = Date.now() - serverDate;
  }

  async fetchOrRefreshAccessToken(): Promise<string> {
    if (this.tokenRequest !== null) {
      return this.tokenRequest;
    }

    if (this.isTokenExpired) {
      this.tokenRequest = this.refreshAccessToken()
        .then((token: Token | void) => (token ? token.accessToken : ""))
        .finally(() => (this.tokenRequest = null));

      // Espera recuperar o token
      await this.tokenRequest;

      // Garante que o token está válido
      return this.fetchOrRefreshAccessToken();
    }

    return this.accessToken;
  }

  /**
   * Obtém um novo token de acesso utilizando uma granType customizado
   * @param grantType Função de grantType
   */
  requestToken(grantType: OAuthGrant): Promise<Token> {
    const request = grantType(
      {
        method: "POST",
        baseURL: this.options.tokenUrl,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: this.options.clientId,
          password: this.options.clientSecret,
        },
        public: true,
      },
      { ...this.options }
    );

    return axios(request).then((res) => ({
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
    }));
  }

  /**
   * Faz login e salva os tokens
   * @param username Nome de usuário
   * @param password Senha
   * @param scopes Escopos do token
   */
  login(username: string, password: string) {
    return this.requestToken(PasswordGrant(username, password)).then((token) =>
      this.options.storage.save(token)
    );
  }

  logout() {
    this.options.storage.clear();
  }

  /**
   * Atualiza os tokens e salva
   */
  refreshAccessToken() {
    console.log("Gerando de novo refresh token");

    return this.requestToken(
      RefreshTokenGrant(this.options.storage.get().refreshToken)
    )
      .then((token) => this.options.storage.save(token))
      .catch((err) => {
        console.log("Erro ao gerar refresh token");

        this.options.storage.clear();
        return Promise.reject(err);
      });
  }
}

export const oauth = Object.freeze(
  new OAuthClient({
    clientId: environment.clientId,
    clientSecret: environment.clientSecret,
    tokenUrl: `${environment.baseUrl}/oauth/token`,
  })
);
