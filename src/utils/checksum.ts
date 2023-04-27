import sha1 from 'crypto-js/sha1';

function genChecksumRequestPhone(userId, phoneNumber) {
  return sha1(userId + phoneNumber + process.env.CHECKSUM_KEY).toString();
}

export default {
  genChecksumRequestPhone,
};
