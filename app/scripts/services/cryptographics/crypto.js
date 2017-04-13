angular.module('jwtApp')
    .factory('Crypto', function(constants, $window) {



        var iv = "F27D5C9927726BCEFE7510B1BDD3D137";
        var salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
        var plainText = "123456";
        var keySize = 128;
        var iterations = 10;
        var iterationCount = 10;
        var passPhrase = "the quick brown fox jumps over the lazy dog";



        var AesUtil = function(keySize, iterationCount) {
            this.keySize = keySize / 32;
            this.iterationCount = iterationCount;
        };

        AesUtil.prototype.generateKey = function(salt, passPhrase) {
            var key = $window.CryptoJS.PBKDF2(
                passPhrase,
                $window.CryptoJS.enc.Hex.parse(salt), { keySize: this.keySize, iterations: this.iterationCount });
            return key;
        }

        AesUtil.prototype.encrypt = function(plainText) {
            var key = this.generateKey(salt, passPhrase);
            var encrypted = $window.CryptoJS.AES.encrypt(
                plainText,
                key, { iv: $window.CryptoJS.enc.Hex.parse(iv) });
            return encrypted.ciphertext.toString($window.CryptoJS.enc.Base64);
        }

        return function() {
            return new AesUtil(keySize, iterationCount);
        }

    });