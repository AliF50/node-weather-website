const request = require('request');

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=86925dafd37d22e06619468c708cd851&query=${encodeURIComponent(long)},${encodeURIComponent(lat)}&units=m`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const { temperature, precip, weather_descriptions, feelslike } = body.current;
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. There is a ${precip}% chance of rain. It feels like ${feelslike} degrees.`);
        }
    });
}

module.exports = forecast;