function parseDurationToMs(input) {
  if (!input) {
    return null;
  }

  const match = input.trim().match(/^(\d+)([dhm])$/i);
  if (!match) {
    return null;
  }

  const value = Number.parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  if (unit === "d") {
    return value * 24 * 60 * 60 * 1000;
  }

  if (unit === "h") {
    return value * 60 * 60 * 1000;
  }

  if (unit === "m") {
    return value * 60 * 1000;
  }

  return null;
}

module.exports = {
  parseDurationToMs,
};
