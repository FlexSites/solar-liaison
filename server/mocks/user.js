
const casual = require('casual')

exports.default = {
  id: casual.word,
  provider: casual.word,
  providerId: casual.url,
  profile: {
    name: casual.full_name,
    givenName: casual.first_name,
    familyName: casual.last_name,
    email: casual.email,
    badgeId: casual.integer(10000, 50000),
  },
  groups: casual.array_of_words(7),
}
