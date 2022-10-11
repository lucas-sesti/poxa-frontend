curl -X POST \
  'https://api.mercadopago.com/v1/payments' \
  -H 'Authorization: Bearer TEST-1040340586248502-040200-32cb72f09a92d8fae2cb0704f5955d12-621754627' \
  -H 'Content-Type: application/json' \
  -d '{
  "additional_info": {
    "items": [
      {
        "id": "PR0001",
        "title": "Point Mini",
        "description": "Producto Point para cobros con tarjetas mediante bluetooth",
        "picture_url": 
"https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
        "category_id": "electronics",
        "quantity": 1,
        "unit_price": 58.8
      }
    ],
    "payer": {
      "first_name": "Test",
      "last_name": "Test",
      "phone": {
        "area_code": 11,
        "number": "987654321"
      },
      "address": {}
    },
    "shipments": {
      "receiver_address": {
        "zip_code": "12312-123",
        "state_name": "Rio de Janeiro",
        "city_name": "Buzios",
        "street_name": "Av das Nacoes Unidas",
        "street_number": 3003
      }
    },
  },
  "description": "Payment for product",
  "external_reference": "MP0001",
  "installments": 1,
  "metadata": {},
  "token": "89f5888f09963a504c84aa68480683d5",
  "payer": {
    "entity_type": "individual",
    "type": "customer",
    "email": "bgonzagabarbosa@gmail.com",
    "identification": {
      "type": "CPF",
      "number": "42027045848"
    }
  },
  "payment_method_id": "master",
  "transaction_amount": 58.8
}'
