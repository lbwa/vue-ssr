/**
 * 创建错误对象
 * @param {Number} code 状态码
 * @param {String} msg 抛出的错误信息
 */
export const createError = (code, msg) => {
  const err = new ErrorEvent(msg)
  err.code = code
  console.error(msg)
  return err
}
