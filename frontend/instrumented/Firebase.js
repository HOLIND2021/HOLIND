function cov_21ltqo8nop() {
  var path = "/Users/jacksonlei/Documents/HOLIND/frontend/src/Firebase.js";
  var hash = "b743db0314ee08e17ae26a7146326d89c44ee4e6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/jacksonlei/Documents/HOLIND/frontend/src/Firebase.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 23
        },
        end: {
          line: 12,
          column: 1
        }
      },
      "1": {
        start: {
          line: 14,
          column: 0
        },
        end: {
          line: 14,
          column: 39
        }
      },
      "2": {
        start: {
          line: 16,
          column: 28
        },
        end: {
          line: 16,
          column: 43
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "b743db0314ee08e17ae26a7146326d89c44ee4e6"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_21ltqo8nop = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_21ltqo8nop();
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = (cov_21ltqo8nop().s[0]++, {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
});
cov_21ltqo8nop().s[1]++;
firebase.initializeApp(firebaseConfig);
export const firebaseAuth = (cov_21ltqo8nop().s[2]++, firebase.auth());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpcmViYXNlLmpzIl0sIm5hbWVzIjpbImZpcmViYXNlIiwiZmlyZWJhc2VDb25maWciLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiUkVBQ1RfQVBQX2FwaUtleSIsImF1dGhEb21haW4iLCJSRUFDVF9BUFBfYXV0aERvbWFpbiIsInByb2plY3RJZCIsIlJFQUNUX0FQUF9wcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwiUkVBQ1RfQVBQX3N0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsIlJFQUNUX0FQUF9tZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwiUkVBQ1RfQVBQX2FwcElkIiwibWVhc3VyZW1lbnRJZCIsIlJFQUNUX0FQUF9tZWFzdXJlbWVudElkIiwiaW5pdGlhbGl6ZUFwcCIsImZpcmViYXNlQXV0aCIsImF1dGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZVk7Ozs7Ozs7OztBQWZaLE9BQU9BLFFBQVAsTUFBcUIscUJBQXJCO0FBQ0EsT0FBTyxzQkFBUDtBQUVBLE1BQU1DLGNBQWMsNkJBQUc7QUFDbkJDLEVBQUFBLE1BQU0sRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGdCQUREO0FBRW5CQyxFQUFBQSxVQUFVLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxvQkFGTDtBQUduQkMsRUFBQUEsU0FBUyxFQUFFTCxPQUFPLENBQUNDLEdBQVIsQ0FBWUssbUJBSEo7QUFJbkJDLEVBQUFBLGFBQWEsRUFBRVAsT0FBTyxDQUFDQyxHQUFSLENBQVlPLHVCQUpSO0FBS25CQyxFQUFBQSxpQkFBaUIsRUFBRVQsT0FBTyxDQUFDQyxHQUFSLENBQVlTLDJCQUxaO0FBTW5CQyxFQUFBQSxLQUFLLEVBQUVYLE9BQU8sQ0FBQ0MsR0FBUixDQUFZVyxlQU5BO0FBT25CQyxFQUFBQSxhQUFhLEVBQUViLE9BQU8sQ0FBQ0MsR0FBUixDQUFZYTtBQVBSLENBQUgsQ0FBcEI7O0FBVUFqQixRQUFRLENBQUNrQixhQUFULENBQXVCakIsY0FBdkI7QUFFQSxPQUFPLE1BQU1rQixZQUFZLDZCQUFHbkIsUUFBUSxDQUFDb0IsSUFBVCxFQUFILENBQWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0ICdmaXJlYmFzZS9jb21wYXQvYXV0aCc7XG5cbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xuICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX2FwaUtleSxcbiAgICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfYXV0aERvbWFpbixcbiAgICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9wcm9qZWN0SWQsXG4gICAgc3RvcmFnZUJ1Y2tldDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX3N0b3JhZ2VCdWNrZXQsXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9tZXNzYWdpbmdTZW5kZXJJZCxcbiAgICBhcHBJZDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX2FwcElkLFxuICAgIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9tZWFzdXJlbWVudElkXG59O1xuXG5maXJlYmFzZS5pbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcblxuZXhwb3J0IGNvbnN0IGZpcmViYXNlQXV0aCA9IGZpcmViYXNlLmF1dGgoKTsiXX0=