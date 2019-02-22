"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = filepath => {
  const fileparts = filepath.split('/');

  if (fileparts.length === 1) {
    return {
      directories: [],
      filename: fileparts[0]
    };
  } else {
    const filename = fileparts.splice(fileparts.length - 1, 1)[0];
    fileparts.splice(0, 1);
    return {
      directories: fileparts,
      filename
    };
  }
};