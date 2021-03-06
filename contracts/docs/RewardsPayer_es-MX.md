# RewardsPayer

RewardsPayer es el contrato que se encarga de calcular y pagar las recompensas tanto a proveedores como a clientes de servicios. RewardsPayer surge como una version ligera del sistema de contratos de Pedro's List.

Para probar la funcionalidad de RewardsPayer, el contrato se encuentra desplegado en Ropsten en la dirección [0x1366df1660b5c333e50a903612ab5b9828aadafb](https://ropsten.etherscan.io/address/0x1366df1660b5c333e50a903612ab5b9828aadafb). Aún no se encuentra desplegado en otras redes de Ethereum.

Los pasos requeridos para interactuar con éste a través de Truffle, son los siguientes:

## Actualizar el tipo de cambio

Actualizar el tipo de cambio del par USDc\ETHw.
```
truffle(ropsten)> RewardsPayer.at('0x1366df1660b5c333e50a903612ab5b9828aadafb')
  .update_USDCent_inETHWei()
```
`BigNumber { s: 1, e: 13, c: [ 92764494250000 ] }`


## Verificar el tipo de cambio

Verificar el tipo de cambio USDc\ETHw. Al multiplicarlo por 10^-18 veces el precio de mercado del par ETH/USD, el resultado deberá tender a $0.01 USD. En caso de no ser exacto, deberá diferir por un margen de error de $0.005 USD.
```
truffle(ropsten)> RewardsPayer.at('0x1366df1660b5c333e50a903612ab5b9828aadafb')
  .USDCent_inETHWei()
  .mul(10**-18) // <-- convertir de Wei (trillonésima de Ether) a unidad de Ether.
  .mul(103.98)  // <-- precio en exchanges del par ETH\USD.
```
`0.00964565211`


## Verificar la cantidad de tokens

Verificar la cantidad de tokens de recompensa que corresponden al servicio prestado o recibido, con base en su precio. El precio deberá ser especificado en centavos de dólar estadounidense, i.e. el precio multiplicado por 100. En el siguiente ejemplo se verifica la cantidad de tokens de recompensa que le corresponden a un servicio valuado en $100 USD.
```
truffle(ropsten)> RewardsPayer.at('0x1366df1660b5c333e50a903612ab5b9828aadafb')
  .getRewardAmount(10000)
```
`BigNumber { s: 1, e: 1, c: [ 22 ] }`


## Solicitar el pago de tokens

Solicitar el pago de los tokens de recompensa que corresponden al servicio. Al igual que en la función anterior, el precio deberá ser especificado en centavos de dólar estadounidense, i.e. el precio multiplicado por 100. En el siguiente ejemplo se verifica la cantidad de tokens de recompensa que le corresponden a un servicio valuado en $100 USD.
```
truffle(ropsten)> RewardsPayer.at('0x1366df1660b5c333e50a903612ab5b9828aadafb')
  .pay(
    10000,
    '0x57afE0744CBd9f3c1EbFf012A0DbbCb3811F987E',
    '0xBA5133C0FEE0C006A9A5328fA064A6b7E7778011'
  )
```