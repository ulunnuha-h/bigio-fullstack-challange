function jsonToFormData(json) {
  const formData = new FormData();
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      formData.append(key, json[key]);
    }
  }

  return formData;
}

export default jsonToFormData;
