const API_BASE = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "will be provided in the comments section";

document.getElementById("generate").addEventListener("click", actions);

function actions() {
  postIt().then(update);
}

// Get data from API
const getAPI = async (zip) => {
  const openWeather = await fetch(
    `${API_BASE}?zip=${zip}&units=imperial&APPID=${API_KEY}`,
    {
      body: JSON.stringify(),
    }
  );

  try {
    const weather = await openWeather.json();
    const temp = weather.main.temp;
    return temp;
  } catch (error) {
    console.log("error", error);
  }
};

// POST data

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newEntry = await response.json();
    return newEntry;
  } catch (error) {
    console.log("error", error);
  }
};

const postIt = async () => {
  let zip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  let gatherData = await getAPI(zip);

  postData("/add", {
    zip: zip,
    feelings: feelings,
    date: (() => {
      return new Date().toDateString();
    })(),
    weather: gatherData,
  });
};

// GET  data
const getData = async () => {
  const reqFull = await fetch("/all");
  try {
    const fullJson = await reqFull.json();
    return fullJson;
  } catch (error) {
    console.log("error", error);
  }
};

//Update TextARA
const update = async () => {
  const TextAreaEntry = await getData();
  try {
    document.getElementById("date").innerHTML = `Date: ${
      TextAreaEntry[TextAreaEntry.length - 1].date
    }`;
    document.getElementById("temp").innerHTML = `Temperature: ${
      TextAreaEntry[TextAreaEntry.length - 1].weather
    }`;
    document.getElementById("content").innerHTML = `Feelings: ${
      TextAreaEntry[TextAreaEntry.length - 1].feelings
    }`;
  } catch (error) {
    console.log("error", error);
  }
};
