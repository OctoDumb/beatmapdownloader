window.electron = require('electron');
window.axios = require('axios').default;
window.fs = require('fs');
window.axios.defaults.adapter = require('axios/lib/adapters/http');