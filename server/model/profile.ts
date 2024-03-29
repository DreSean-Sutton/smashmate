var mongoose = require('mongoose');

const profilesSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favorites: {
    fighterData: mongoose.Schema.Types.Mixed,
    length: Number
  },
});

const Profile = mongoose.model('profile', profilesSchema);

export default Profile;
