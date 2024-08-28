import moment from "moment";
import { ObjectId } from "mongodb";

export const parseUserFilter = (query) => {
  const page = query.page ? query.page : 0;
  const count = query.count ? Number(query.count) : 10;

  let match_filter = {
    // $or: [{ is_deleted: { $exists: false } }, { is_deleted: false }],
  };
  let date_filter;
  const search_params = {};

  const start_date = query.start_date
    ? moment(query.start_date, "MM/DD/YYYY", true).isValid()
      ? moment(query.start_date, "MM/DD/YYYY").format()
      : null
    : null;
  const end_date = query.end_date
    ? moment(query.end_date, "MM/DD/YYYY", true).isValid()
      ? moment(query.end_date, "MM/DD/YYYY").format()
      : null
    : null;

  if (start_date || end_date) {
    date_filter = { createdAt: {} };
    if (start_date) {
      date_filter.createdAt["$gte"] = new Date(start_date);
    }
    if (end_date) {
      date_filter.createdAt["$lte"] = new Date(end_date);
    }
  }

  if (query.title) {
    const titles = query.title.split(",").map((item) => item.trim());

    match_filter = {
      ...match_filter,
      "name.title": { $in: titles.map((title) => title.toLowerCase()) },
    };
  }
  if (query.location) {
    const locations = query.location.split(",").map((item) => item.trim());

    match_filter = {
      ...match_filter,
      "location.country": {
        $in: locations.map((location) => location.toLowerCase()),
      },
    };
  }
  if (query.dob) {
    const dobs = query.dob.split(",").map((item) => item.trim().toLowerCase());
    console.log(dobs);

    const monthMapping = {
      january: 1,
      february: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      september: 9,
      october: 10,
      november: 11,
      december: 12,
    };

    const months = dobs.map((dob) => monthMapping[dob]).filter(Boolean);

    if (months.length > 0) {
      match_filter = {
        ...match_filter,
        ...{
          $expr: {
            $in: [{ $month: "$dob.date" }, months],
          },
        },
      };
    }
  }

  if (query.age) {
    match_filter = {
      ...match_filter,
      ...{ "dob.age": Number(query.age) },
    };
  }
  if (query.gender) {
    match_filter = {
      ...match_filter,
      ...{ gender: query.gender.toLowerCase() },
    };
  }

  if (query.search) {
    search_params["$or"] = [
      { "name.title": { $regex: query.search.toLowerCase() } },
      { "name.first": { $regex: query.search.toLowerCase() } },
      { "name.last": { $regex: query.search.toLowerCase() } },
      { email: { $regex: query.search.toLowerCase() } },
      { "location.street.number": Number(query.search) },
      { "location.street.name": { $regex: query.search.toLowerCase() } },
      { "location.city": { $regex: query.search.toLowerCase() } },
      { "location.state": { $regex: query.search.toLowerCase() } },
      { "location.country": { $regex: query.search.toLowerCase() } },
      { "location.postcode": Number(query.search) },
    ];
  }

  match_filter = {
    ...match_filter,
    ...date_filter,
    $and: [search_params],
  };

  return { match_filter, page, count };
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
