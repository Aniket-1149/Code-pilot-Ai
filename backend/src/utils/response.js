function ok(res, data, meta) {
  return res.json({ data, meta });
}

module.exports = { ok };
