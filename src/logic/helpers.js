import { lstatSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const naturalCompare = (a, b) => {
  let ax = [];
  let bx = [];
  let aText = a.toString();
  let bText = b.toString();
  aText.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    ax.push([$1 || Infinity, $2 || ""]);
  });
  bText.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    bx.push([$1 || Infinity, $2 || ""]);
  });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }
  return ax.length - bx.length;
};

const propertyNameCompare = (a, b) => {
  if (a.name > b.name) return 1;
  else if (a.name < b.name) return -1;
  return 0;
};

const isDirectory = path => lstatSync(path).isDirectory();
const isFile = path => lstatSync(path).isFile();
const isHiddenFile = name => /^\./.test(name);
const exists = path => existsSync(path);
const getDirectories = path =>
  readdirSync(path)
    .filter(name => exists(join(path, name)) && isDirectory(join(path, name)))
    .sort(naturalCompare);
const getFiles = path =>
  readdirSync(path)
    .filter(name => exists(join(path, name)) && isFile(join(path, name)) && !isHiddenFile(name))
    .sort(naturalCompare);
const resolve = (path, name) => {
  const directories = getDirectories(path);
  const dirName = directories.find(x => isEqual(x, name));
  return join(path, dirName);
};

const protocolFile = file => `file://${file}`;

const normalize = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const isEqual = (name1, name2) => normalize(name1.toLowerCase()) === normalize(name2.toLowerCase());
const removeExtension = name => name.replace(/\.[^/.]+$/, "");
const removeOrder = name => name.replace(/.*?(?=[a-z]|[A-Z])/, "");
const extractName = name => removeExtension(removeOrder(name));

const plurals = (array, singular, plural) => {
  if (array && array.length > 0) {
    return array.length === 1 ? `${array.length} ${singular}` : `${array.length} ${plural}`;
  } else return `0 ${plural}`;
};

export {
  naturalCompare,
  propertyNameCompare,
  isDirectory,
  isFile,
  exists,
  getDirectories,
  getFiles,
  resolve,
  protocolFile,
  normalize,
  isEqual,
  removeExtension,
  removeOrder,
  extractName,
  plurals
};
