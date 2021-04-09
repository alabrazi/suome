module.exports = (req, res, next) => {
	const page = req.query.page ? Number(req.query.page) : 1;
	const per_page = req.query.per_page ? Number(req.query.per_page) : 10;
	if (page < 1 || per_page < 1 || per_page > 50) return res.status(400).send('page or per_page value invalid');

	req.pagination = {
		skip: (Number(page) - 1) * Number(per_page),
		limit: Number(per_page)
	};
	next();
};
