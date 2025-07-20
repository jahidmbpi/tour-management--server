import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const genaretetocken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const tocken = jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
  return tocken;
};

export const verifyTocken = (tocken: string, secret: string) => {
  const verifyTocken = jwt.verify(tocken, secret);
  return verifyTocken;
};
