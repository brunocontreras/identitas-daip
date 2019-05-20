import { join } from "path";
import { getDirectories, getFiles, isFile, isEqual, extractName, protocolFile } from "./helpers";
import config from "./config";
import { TYPES } from "./types";
import { plurals } from "@/models/helpers";
import { readFileSync } from "fs";
// import ffprobe from 'ffprobe'
// import ffprobeStatic from 'ffprobe-static'

const PRESENTATION_DIRECTORIES = {
  AUDIOS: "Audios",
  LYRICS: "Letras",
  VIDEOS: "Vídeos",
  SLIDES: "PowerPoint"
};

let sectionId = 1;
let courseId = 1;
let presentationId = 1;
let videoId = 1;
let audioId = 1;

const data = {
  nodes: [],
  sections: [],
  courses: [],
  presentations: [],
  audios: [],
  videos: []
};

const log = [];

// const parseToMMSS = (text) => {
//   const secNum = parseInt(text, 10)
//   let hours = Math.floor(secNum / 3600)
//   let minutes = Math.floor((secNum - (hours * 3600)) / 60)
//   let seconds = secNum - (hours * 3600) - (minutes * 60)

//   if (hours < 10) hours = `0${hours}`
//   if (minutes < 10) minutes = `0${minutes}`
//   if (seconds < 10) seconds = `0${seconds}`
//   return `${minutes}:${seconds}`
// }

// Warnings
const warningRootNoContent = () => log.push("La carpeta raíz no tiene contenido");
const warningNoContent = breadCrumb => log.push(`La carpeta ${breadCrumb.join(" > ")} no tiene contenido`);
// const warningNoDirectory = directory => log.push(`No existe la carpeta '${directory}'`);
const warningNoSlides = name => log.push(`La presentación ${name} no tiene diapositivas`);
// const checkData = () => {
//   if (data.experts === undefined) warningNoDirectory(ROOT_DIRECTORIES.EXPERTS);
//   if (data.family === undefined) warningNoDirectory(ROOT_DIRECTORIES.FAMILY);
//   if (data.training === undefined) warningNoDirectory(ROOT_DIRECTORIES.TRAINING);
//   if (data.conferences === undefined) warningNoDirectory(ROOT_DIRECTORIES.CONFERENCES);
// };

// const audioExtensions = Object.values(data.audios).map(x => x.path.slice(-4)).filter((value, index, self) => {
//   return self.indexOf(value) === index
// })
// console.log(audioExtensions)

// Constructores
const newSection = ({ name, parent, disabled, image }) => {
  const section = { id: sectionId++, name, parent, type: TYPES.SECTION, disabled, image };
  data.sections.push(section);
  return section;
};
const newCourse = ({ name, parent, disabled, image }) => {
  const course = { id: courseId++, name, parent, type: TYPES.COURSE, disabled, image };
  data.courses.push(course);
  return course;
};
const newPresentation = ({ path, name, parent }) => {
  const presentation = { id: presentationId++, path, name, parent, type: TYPES.PRESENTATION };
  data.presentations.push(presentation);
  return presentation;
};
const newVideo = ({ path, name, parent }) => {
  const video = { id: videoId++, path, name, parent, type: TYPES.VIDEO };
  data.videos.push(video);
  return video;
};
const newAudio = ({ path, lyricsDirPath, name, parent }) => {
  const audio = { id: audioId++, path, name, parent, type: TYPES.AUDIO };
  const lyricsFile = `${name}.txt`;
  const lyricsPath = join(lyricsDirPath, lyricsFile);
  if (isFile(lyricsPath)) {
    audio.lyricsPath = lyricsPath;
    audio.lyrics = readFileSync(lyricsPath);
  }
  data.audios.push(audio);
  return audio;
};

const readAudioDir = ({ path, lyricsDirPath, parent }) => {
  const files = getFiles(path);
  if (files) {
    return files.map(name => {
      const audio = newAudio({
        path: protocolFile(join(path, name)),
        lyricsDirPath,
        name: extractName(name),
        parent
      });
      return audio;
    });
  }
};

const readVideoDir = ({ path, parent }) => {
  const files = getFiles(path);
  if (files) {
    return files.map(name => {
      const video = newVideo({
        path: protocolFile(join(path, name)),
        name: extractName(name),
        parent
      });
      // ffprobe(join(path, name), { path: ffprobeStatic.path })
      //   .then(info => {
      //     video.duration = parseToMMSS(info.streams[0].duration)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
      return video;
    });
  }
};

const readSlides = ({ path, name }) => {
  const files = getFiles(path);
  if (!files) warningNoSlides(name);
  else return files.map(name => protocolFile(join(path, name)));
};

const readPresentation = ({ path, name, parent }) => {
  const directories = getDirectories(path);
  if (!directories) {
    warningNoContent(parent.name);
    return [];
  } else {
    const presentation = newPresentation({ path, name, parent });
    directories.forEach(name => {
      if (isEqual(PRESENTATION_DIRECTORIES.AUDIOS, name)) {
        const existsLyrics = directories.find(d => isEqual(PRESENTATION_DIRECTORIES.LYRICS, d));
        presentation.audios = readAudioDir({
          path: join(path, name),
          lyricsDirPath: existsLyrics ? join(path, PRESENTATION_DIRECTORIES.LYRICS) : "",
          name,
          parent: presentation
        });
      }
      if (isEqual(PRESENTATION_DIRECTORIES.VIDEOS, name)) {
        presentation.videos = readVideoDir({ path: join(path, name), name, parent: presentation });
      }
      if (isEqual(PRESENTATION_DIRECTORIES.SLIDES, name)) {
        presentation.slides = readSlides({ path: join(path, name), name });
      }
    });
    return presentation;
  }
};

const readPresentations = ({ path, parent }) => {
  const directories = getDirectories(path);
  if (!directories) {
    warningNoContent(parent.name);
    return [];
  } else {
    return directories.map(name => readPresentation({ path: join(path, name), name, parent }));
  }
};

const readCourses = ({ path, parent }) => {
  const directories = getDirectories(path);
  if (!directories) {
    warningNoContent(parent.name);
    return [];
  } else {
    return directories.map(name => {
      const course = newCourse({ name, parent });
      course.children = readPresentations({ path: join(path, name), parent: course });
      course.description = plurals(course.children, "presentación", "presentaciones");
      return course;
    });
  }
};

// const _readRootDirectory = path => {
//   console.time("identitas");
//   const directories = getDirectories(path);
//   if (!directories) warningRootNoContent();
//   else {
//     directories.forEach(name => {
//       const item = data.root.find(x => isEqual(x.name, name));
//       if (!item) return;

//       item.disabled = false;
//       const options = { path: join(path, name), parent: item };
//       if (item.type === TYPES.SECTION) {
//         data.sections.push(item);
//         item.children = readCourses(options);
//       } else {
//         data.courses.push(item);
//         item.children = readPresentations(options);
//       }
//     });
//   }
//   console.timeEnd("identitas");
//   return { data, log };
// };

const readNodes = ({ nodes, path, parent }) => {
  const directories = getDirectories(path);
  return nodes.map(node => {
    const disabled = !directories.find(x => x === node.name);
    const constructor = node.type === TYPES.SECTION ? newSection : newCourse;
    const newNode = constructor({ name: node.name, parent, disabled, image: node.image });
    const options = { path: join(path, node.name), parent: newNode };
    if (!disabled) {
      if (node.children) {
        newNode.children = readNodes({ nodes: node.children, ...options });
        newNode.disabled = newNode.children.every(x => x.disabled);
      } else if (node.type === TYPES.SECTION) newNode.children = readCourses(options);
      else if (node.type === TYPES.COURSE) newNode.children = readPresentations(options);
      else newNode.children = [];
    }
    if (node.children) {
      const courses = newNode.disabled ? 0 : newNode.children;
      newNode.description = plurals(courses, "curso", "cursos");
    } else if (node.type === TYPES.SECTION) newNode.description = plurals(newNode.children, "curso", "cursos");
    else if (node.type === TYPES.COURSE) newNode.description = plurals(newNode.children, "presentación", "presentaciones");
    return newNode;
  });
};

const readRootDirectory = path => {
  console.time("identitas");
  const directories = getDirectories(path);
  if (!directories) warningRootNoContent();
  else data.nodes = readNodes({ nodes: config, path, parent: null });
  console.timeEnd("identitas");
  return { data, log };
};

export default readRootDirectory;
