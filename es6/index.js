import { transform as babelTransform } from 'babel-core';

export default function convert(src) {
  return babelTransform(src);
};