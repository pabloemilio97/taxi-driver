module.exports = {
  'countries': [
    { 'code': 'mx', 'name': 'Mexico' },
    { 'code': 'ar', 'name': 'Argentina' },
    { 'code': 'sa', 'name': 'Saudi Arabia' }
  ],
  'taxRules': [
    {
      'country': 'mx',
      'taxName': 'IVA',
      'whitholded': false,
      'validFrom': '1900-04-23T18:25:43.511Z',
      'validUntil': '2999-04-23T18:25:43.511Z',
      'txType': 'sales',
      'docType': 'invoice',
      'rate': '0.16'
    },
    {
      'country': 'mx',
      'taxName': 'IVA',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'area': 'externo',
      'category': 'DRUG',
      'rate': '0.0',
      'meta': {
        'exempt': true
      }
    },
    {
      'country': 'mx',
      'taxName': 'RET_IVA',
      'whitholded': true,
      'dep': 'IVA',
      'txType': 'income',
      'docType': 'invoice',
      'rate': '2/3'
    },
    {
      'country': 'mx',
      'taxName': 'RET_ISR',
      'whitholded': true,
      'dep': 'ISR',
      'txType': 'income',
      'docType': 'invoice',
      'rate': '0.1'
    },
    {
      'country': 'mx',
      'region': 'NL',
      'taxName': 'PAYROLL',
      'whitholded': false,
      'txType': 'income',
      'category': 'NOMINA',
      'rate': '0.02'
    },
    {
      'country': 'mx',
      'region': 'DF',
      'taxName': 'PAYROLL',
      'whitholded': false,
      'txType': 'income',
      'category': 'NOMINA',
      'rate': '0.03'
    },
    {
      'country': 'mx',
      'region': 'AGS',
      'taxName': 'IVA',
      'whitholded': false,
      'docType': 'ARI',
      'txType': 'sales',
      'bpType': 'signed',
      'area': 'externo',
      'category': 'DRUG',
      'rate': '0.16'
    },
    {
      'country': 'mx',
      'region': 'AGS',
      'taxName': 'ISR',
      'whitholded': false,
      'docType': 'ARI',
      'txType': 'sales',
      'bpType': 'signed',
      'area': 'externo',
      'category': 'DRUG',
      'rate': '0.10'
    },
    {
      'country': 'mx',
      'region': 'AGS',
      'taxName': 'RET_IVA',
      'whitholded': true,
      'docType': 'ARI',
      'txType': 'sales',
      'bpType': 'signed',
      'area': 'externo',
      'category': 'DRUG',
      'rate': '2/3',
      'dep': 'IVA'
    },
    {
      'country': 'mx',
      'region': 'AGS',
      'taxName': 'RET_ISR',
      'whitholded': true,
      'docType': 'ARI',
      'txType': 'sales',
      'bpType': 'signed',
      'area': 'externo',
      'category': 'DRUG',
      'rate': '0.10'
    },
    {
      'country': 'mx',
      'taxName': 'IEPS',
      'whitholded': false,
      'txType': 'sales',
      'category': 'CANDY',
      'rate': 'IF(quantity > 100, 0.08, 0.0)'
    },
    {
      'country': 'mx',
      'taxName': 'IEPS',
      'whitholded': false,
      'txType': 'sales',
      'category': 'ENERGY_DRINKS',
      'rate': 0.25
    },
    {
      'country': 'mx',
      'taxName': 'IVA',
      'whitholded': false,
      'txType': 'sales',
      'category': 'SOFT_DRINKS',
      'rate': 0.16
    },
    {
      'country': 'mx',
      'taxName': 'IEPS',
      'whitholded': false,
      'txType': 'sales',
      'category': 'SOFT_DRINKS',
      'amount': 'quantity'
    },
    {
      'country': 'sa',
      'taxName': 'VAT',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'category': 'DRUG',
      'bpType': 'TAXYES',
      'rate': 'IF(unitPrice > 2000, 0.02, 0.05)'
    },
    {
      'country': 'sa',
      'taxName': 'VAT',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'category': 'DRUG',
      'bpType': '!TAXYES',
      'rate': '0'
    },
    {
      'country': 'sa',
      'taxName': 'VAT',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'category': '!DRUG',
      'bpType': 'TAXYES',
      'rate': 'IF(unitPrice > 5000, 0.05, 0.04)'
    },
    {
      'country': 'sa',
      'taxName': 'VAT',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'invoice',
      'category': '!DRUG',
      'bpType': '!TAXYES',
      'rate': '0'
    },
    {
      'country': 'ar',
      'taxName': 'IVA',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'payment',
      'category': 'ALQUILERES_RURAL',
      'bpType': 'INSCRIPTO',
      'vars': {
        'escala': 'IF(AND(subTotal>0,subTotal<=5000), 0.05, IF(subTotal<=10000,0.09,IF(subTotal<=15000,0.12,IF(subTotal<=20000,0.15,IF(subTotal<=30000,0.19,IF(subTotal<=40000,0.23,IF(subTotal<=60000,0.27,0.31)))))))',
        'retAll': 'IF(subTotal > 10700, escala, 0.06)',
        'taxable': 'subTotal * retAll'
      },
      'rate': 'retAll',
      'amount': 'IF(taxable <= 150, 150, taxable)'
    },
    {
      'country': 'ar',
      'taxName': 'IVA',
      'whitholded': false,
      'txType': 'sales',
      'docType': 'payment',
      'category': 'ALQUILERES_RURAL',
      'bpType': 'NO_INSCRIPTO',
      'vars': {
        'retAll': 'IF(subTotal > 10700, 0.28, 0.25)',
        'taxable': 'subTotal * retAll'
      },
      'rate': 'retAll',
      'amount': 'IF(taxable <= 150, 150, taxable)'
    }
  ]
}
