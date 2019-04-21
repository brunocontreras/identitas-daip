import { lstatSync, readdirSync } from "fs";
import { join } from "path";

const naturalCompare = (a, b) => {
  let ax = [];
  let bx = [];
  a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    ax.push([$1 || Infinity, $2 || ""]);
  });
  b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
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

const isDirectory = path => lstatSync(path).isDirectory();
const isFile = path => lstatSync(path).isFile();
const getDirectories = path =>
  readdirSync(path)
    .filter(name => isDirectory(join(path, name)))
    .sort(naturalCompare);
const getFiles = path =>
  readdirSync(path)
    .filter(name => isFile(join(path, name)))
    .sort(naturalCompare);

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
  isDirectory,
  isFile,
  getDirectories,
  getFiles,
  normalize,
  isEqual,
  removeExtension,
  removeOrder,
  extractName,
  plurals
};
