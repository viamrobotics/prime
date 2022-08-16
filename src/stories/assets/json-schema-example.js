export default JSON.stringify({
  $schema: 'http://json-schema.org/draft-04/schema#',
  $ref: '#/definitions/AttrConfig',
  definitions: {
    AttrConfig: {
      required: ['token', 'host'],
      properties: {
        token: {
          type: 'string',
          description: 'string',
        },
        host: {
          type: 'string',
          description: 'string',
        },
      },
      additionalProperties: false,
      type: 'object',
    },
  },
});
