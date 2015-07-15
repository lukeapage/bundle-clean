import convert from './index';
import fs from 'fs';

var content = fs.readFileSync("./test/fixture/less2css-bundle-in.js");

content = convert(content);

fs.writeFileSync("./test/fixture/less2css-bundle-gen.js", content);