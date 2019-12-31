const findOneRecord = ({
  Model,
  locals = {},
  body = {},
  params = { id: null }
}: {
  Model: any;
  locals?: any;
  body?: any;
  params?: any;
}) => {
  const { parent = {}, sequelizeParams = {} } = locals;
  const { parentId } = parent;
  const { id } = params;

  const { criteria = { ...parentId } } = body;

  return Model.findOne({ where: { id, ...criteria }, ...sequelizeParams });
};

export default findOneRecord;
