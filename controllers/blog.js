/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('blog/index', {
    title: 'Blog'
  });
};
