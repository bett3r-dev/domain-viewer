const schema = {
  type: 'object',
  flags: {
    description: 'Es un carrito',
  },
  keys: {
    userId: {
      type: 'string',
      flags: {
        description: 'Es un userId',
      },
      rules: [{ name: 'guid' }],
    },
    products: {
      type: 'object',
      patterns: [
        {
          schema: {
            type: 'string',
            rules: [{ name: 'guid' }],
          },
          rule: {
            type: 'object',
            keys: {
              productId: { type: 'string' },
              productInfo: {
                type: 'object',
                keys: {
                  sku: { type: 'string' },
                  name: {
                    type: 'string',
                    rules: [{ name: 'max', args: { limit: 300 } }],
                  },
                  price: { type: 'number' },
                },
              },
              quantity: { type: 'number', rules: [{ name: 'integer' }] },
            },
          },
        },
      ],
    },
    isClosed: { type: 'boolean' },
  },
};
