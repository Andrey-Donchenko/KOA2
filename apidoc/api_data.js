define({ "api": [
  {
    "name": "LoginUser",
    "type": "POST",
    "url": "/api/v1/access/login",
    "title": "Login",
    "version": "0.0.1",
    "group": "Access",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Content-Type</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/api/v1/access/login'\n -H \"Content-Type: application/json\"\n -X POST\n -d  '{\"email\":\"vasya@ya.com\",\"password\":\"123456\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"accessToken\":\"+fUPIAwNdRK2d5g8mv3FOyYFW14FiKlsZRXSLCl2oUZZ3zM3I1wDTdUoI0S7Yl/ECkDO7/2bRa9kStJR9rQkler/G8BruDgUvHHqsspyUoxSS885jS10VykrSuCzCQ==\",\"refreshToken\":\"wLpCvQxtuqoYEYPBxtp6GWZzac8ZPJ4XRKABhHFnsJ7CD4Ws4va5dQdrC2aRT5TW4Nvc6bHqfpkBY5qnsFu5NGtrGoHQjs84Z6AwRefqdaNU6McnkaFWkCdQpkTzwUtxqNRodFLyhWyDYXssSMApciakPT2GJfD88H3zhwHMzBsNgcj4nuJeUyjbE8PvhuMK3ZV8rWhXc3Pe3HTfgeMJHCF3rne2kssFHVCcw3BhS29Nf9oUHFftadpFtKEW4j7m\",\"createdAt\":\"2017-05-17T08:41:41.510Z\",\"updatedAt\":\"2017-05-17T08:41:41.510Z\",\"isDeleted\":false,\"roles\":[\"user\"],\"_id\":\"591c0cc5407eba1706aeb43e\",\"email\":\"test2@mail.com\",\"firstName\":\"testAdmin\",\"lastName\":\"testAdmin\",\"address\":{\"city\":\"testAdmin\",\"searchLocation\":\"testAdmin\"},\"identities\":{\"vkontakteId\":null,\"facebookId\":null}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Users id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>avatar</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.region",
            "description": "<p>Region</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.city",
            "description": "<p>City</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.street",
            "description": "<p>Street</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.house",
            "description": "<p>House</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.flat",
            "description": "<p>Flat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.searchLocation",
            "description": "<p>String used for search optimization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profession",
            "description": "<p>Profession</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "roles",
            "description": "<p>User access roles</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>Is user deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>User create date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>User update date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "'man'",
              "'woman'"
            ],
            "optional": true,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "identities",
            "description": "<p>Social networks of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.facebookId",
            "description": "<p>User facebook id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.vkontakteId",
            "description": "<p>User vkontakte id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User access token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "refreshToken",
            "description": "<p>User refresh token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "[{param:\"email\",message:\"Valid email is required\"}]",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>{param:&quot;email&quot;,message:&quot;Valid email is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>{param:&quot;password&quot;,message:&quot;Valid password is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>{param:&quot;email&quot;,message:&quot;User not found&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "PasswordIsNotCorrect",
            "description": "<p>{param:&quot;password&quot;,message:&quot;User password is not correct&quot;}</p>"
          }
        ]
      }
    },
    "filename": "server/route/_access.js",
    "groupTitle": "Access"
  },
  {
    "name": "RegisterUser",
    "type": "POST",
    "url": "/api/v1/access/register",
    "title": "Registration",
    "version": "0.0.1",
    "group": "Access",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Content-Type</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "5,20",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profession",
            "description": "<p>Profession</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isUser",
            "description": "<p>Is User</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/api/v1/access/register'\n -H \"Content-Type: application/json\"\n -X POST\n -d  '{\"email\":\"vasya@ya.com\",\"password\":\"123456\",\"firstName\":\"Vasya\",\"lastName\":\"Pupkin\",\"city\":\"Zaporizhzhya\",\"isUser\":false,\"profession\":\"developer\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"accessToken\":\"fLqwmMXlJU0KwzOgEoZedfEVg5cAJz4YBhvJCJ3ptizU7B37BoIqahhYf8+4e1e5riEa2qKqaBoi0JtKPuOl7XqY11lulkTx8ZhhUHFI3HeCJhuL+rtJLj7eqASSVQ==\",\"refreshToken\":\"efXJikML3M4q3gn2PJ3KYozmraFSwq8obbxynrfLYab3Agwe2UMdyskagMMKqjx7g447qK932xAvEDJscaRc8rHwTogBGpZJKgFKGr3jinutcreoUu8S3KQ9guhojZG9bMkzJUjKF5NAMUfwUEoF9oHqEdfL9cWrnmzLb5ieXF765Vmz2GCqVUdtGfXawkcLteSXJPHbc9j3dxhRdb7RpHzbQMSPhsehGbQkQ88GY3ryrcXR3NYwUNVPv9ojXmC2\",\"createdAt\":\"2017-05-17T08:41:41.510Z\",\"updatedAt\":\"2017-05-17T08:41:41.510Z\",\"isDeleted\":false,\"roles\":[\"user\"],\"_id\":\"591c0cc5407eba1706aeb43e\",\"email\":\"test2@mail.com\",\"firstName\":\"testAdmin\",\"lastName\":\"testAdmin\",\"address\":{\"city\":\"testAdmin\",\"searchLocation\":\"testAdmin\"},\"identities\":{\"vkontakteId\":null,\"facebookId\":null}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Users id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>avatar</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.region",
            "description": "<p>Region</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.city",
            "description": "<p>City</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.street",
            "description": "<p>Street</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.house",
            "description": "<p>House</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.flat",
            "description": "<p>Flat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.searchLocation",
            "description": "<p>String used for search optimization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profession",
            "description": "<p>Profession</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "roles",
            "description": "<p>User access roles</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>Is user deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>User create date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>User update date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "'man'",
              "'woman'"
            ],
            "optional": true,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "identities",
            "description": "<p>Social networks of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.facebookId",
            "description": "<p>User facebook id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.vkontakteId",
            "description": "<p>User vkontakte id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User access token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "refreshToken",
            "description": "<p>User refresh token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "[{param:\"email\",message:\"Valid email is required\"}]",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>{param:&quot;email&quot;,message:&quot;Valid email is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "EmailExist",
            "description": "<p>{param:&quot;email&quot;,message:&quot;There is an existing user connected to this email&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "PasswordSize",
            "description": "<p>{param:&quot;password&quot;,message:&quot;Password must be between 5-20 characters long&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "FirstNameRequired",
            "description": "<p>{param: &quot;firstName&quot;, message: &quot;First Name is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "LastNameRequired",
            "description": "<p>{param: &quot;lastName&quot;, message: &quot;Last Name is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "CityRequired",
            "description": "<p>{param: &quot;city&quot;, message: &quot;City is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "IsUserRequired",
            "description": "<p>{param: &quot;profession&quot;, message: &quot;Profession is required for professionals&quot;}</p>"
          }
        ]
      }
    },
    "filename": "server/route/_access.js",
    "groupTitle": "Access"
  },
  {
    "name": "changePassword",
    "type": "POST",
    "url": "/api/v1/authAccess/changePassword",
    "title": "Change user password",
    "version": "0.0.1",
    "group": "Access",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Content-Type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User bearer access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Old password</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/api/v1/authAccess/changePassword'\n -H \"Content-Type: application/json\"\n -H \"Authorization: Bearer u5YnSW0kgUj9bTEXf2uX93IR4NgX9TrqCUR3Y5DFO5eJZgSAxLYU5zIL4PUDKdSM1vOZ3vVgzINaaWhYFpFzbuc0/wzHU6Iq6NWW9qHXy174W7rYbhDpeMi4E5uPrg==\"\n -X POST\n -d  '{\"password\":\"test\",\"oldPassword\":\"test\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"result\":\"success\"}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "'success'"
            ],
            "optional": false,
            "field": "result",
            "description": "<p>Result type</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "[{param : 'accessToken', message : 'User not found'}]",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "PasswordSize",
            "description": "<p>{param:&quot;password&quot;,message:&quot;Password must be between 5-20 characters long&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "OldPasswordSize",
            "description": "<p>{param:&quot;password&quot;,message:&quot;Old password must be between 5-20 characters long&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>{param : 'accessToken', message : 'User not found'}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "OldPasswordIsNotCorrect",
            "description": "<p>{param : 'oldPassword', message : 'User old password is not correct'}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "AccessTokenIncorrect",
            "description": "<p>{ param : 'accessToken', message : 'Access token is incorrect'}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "AccessTokenExpired",
            "description": "<p>{ param : 'accessToken', message : 'Access token is expired'}</p>"
          }
        ]
      }
    },
    "filename": "server/route/_access.js",
    "groupTitle": "Access"
  },
  {
    "name": "forgotPassword",
    "type": "POST",
    "url": "/api/v1/access/forgot",
    "title": "Forgot password",
    "version": "0.0.1",
    "group": "Access",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Content-Type</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/api/v1/access/forgot'\n -H \"Content-Type: application/json\"\n -X POST\n -d  '{\"email\":\"vasya@ya.com\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"result\":\"success\"}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "'success'"
            ],
            "optional": false,
            "field": "result",
            "description": "<p>Result type</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "[{param:\"email\",message:\"Valid email is required\"}]",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>{param:&quot;email&quot;,message:&quot;Valid email is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>{param : 'email', message : 'User not found'}</p>"
          }
        ]
      }
    },
    "filename": "server/route/_access.js",
    "groupTitle": "Access"
  },
  {
    "name": "loginConfirm",
    "type": "GET",
    "url": "/api/v1/authAccess/loginConfirm",
    "title": "Check access token",
    "version": "0.0.1",
    "group": "Access",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Content-Type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User bearer access token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/api/v1/authAccess/loginConfirm'\n -H \"Content-Type: application/json\"\n -H \"Authorization: Bearer u5YnSW0kgUj9bTEXf2uX93IR4NgX9TrqCUR3Y5DFO5eJZgSAxLYU5zIL4PUDKdSM1vOZ3vVgzINaaWhYFpFzbuc0/wzHU6Iq6NWW9qHXy174W7rYbhDpeMi4E5uPrg==\"\n -X GET",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"createdAt\":\"2017-05-17T08:41:41.510Z\",\"updatedAt\":\"2017-05-17T08:41:41.510Z\",\"isDeleted\":false,\"roles\":[\"user\"],\"_id\":\"591c0cc5407eba1706aeb43e\",\"email\":\"test2@mail.com\",\"firstName\":\"testAdmin\",\"lastName\":\"testAdmin\",\"address\":{\"city\":\"testAdmin\",\"searchLocation\":\"testAdmin\"},\"identities\":{\"vkontakteId\":null,\"facebookId\":null}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Users id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>avatar</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.region",
            "description": "<p>Region</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.city",
            "description": "<p>City</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.street",
            "description": "<p>Street</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.house",
            "description": "<p>House</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.flat",
            "description": "<p>Flat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.searchLocation",
            "description": "<p>String used for search optimization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profession",
            "description": "<p>Profession</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "roles",
            "description": "<p>User access roles</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>Is user deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>User create date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>User update date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "'man'",
              "'woman'"
            ],
            "optional": true,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "identities",
            "description": "<p>Social networks of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.facebookId",
            "description": "<p>User facebook id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.vkontakteId",
            "description": "<p>User vkontakte id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User access token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "refreshToken",
            "description": "<p>User refresh token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "[{message:\"User not found\", param : 'accessToken'}]",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "AccessTokenIncorrect",
            "description": "<p>{ param : 'accessToken', message : 'Access token is incorrect'}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "AccessTokenExpired",
            "description": "<p>{ param : 'accessToken', message : 'Access token is expired'}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>{ param : 'accessToken', message : 'User not found'}</p>"
          }
        ]
      }
    },
    "filename": "server/route/_access.js",
    "groupTitle": "Access"
  },
  {
    "name": "refreshToken",
    "type": "POST",
    "url": "/api/v1/access/refreshToken",
    "title": "Refresh access token",
    "version": "0.0.1",
    "group": "Access",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Content-Type</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>User refresh token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/api/v1/access/login'\n -H \"Content-Type: application/json\"\n -X POST\n -d  '{\"refreshToken\":\"6dcpum9bWgVGx5VSTtgiwc2x8nFs6muxpk82FVcKDChqhgiKKM4L8nEKHgpZXjUqjdGUWWnrzBmjciAK5vG2zcyMjxku3r3sxjWAGVuWdvBN3fJory3G5fjPedQAJYFFryckhqpomQ4gMX7AXjubxdv9MEsVuuiagYEqyZvVi3mJeoUyuVv5SnxoTMafbedKJ2bMqh2Cm5hnisxYoTnNU6CaCgMwBB25NxaMnfpfZVy5tcz95vRqfTBumV9r8pe2\"}'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"accessToken\":\"ljxlZhWUjO7hVwP+r8rYjOCCvhvtrIQbcDPrXZQFmjkrcpYPriHRl2jc/8YEIL0ThjXcAdYtstlVuojR1eT/xhBoayc42NeFIL6uTAF36MkomIeInyPuJDfXmxXTLw==\",\"createdAt\":\"2017-05-17T08:41:41.510Z\",\"updatedAt\":\"2017-05-17T08:41:41.510Z\",\"isDeleted\":false,\"roles\":[\"user\"],\"_id\":\"591c0cc5407eba1706aeb43e\",\"email\":\"test2@mail.com\",\"firstName\":\"testAdmin\",\"lastName\":\"testAdmin\",\"address\":{\"city\":\"testAdmin\",\"searchLocation\":\"testAdmin\"},\"identities\":{\"vkontakteId\":null,\"facebookId\":null}}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Users id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>avatar</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.region",
            "description": "<p>Region</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.city",
            "description": "<p>City</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.street",
            "description": "<p>Street</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.house",
            "description": "<p>House</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.flat",
            "description": "<p>Flat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.searchLocation",
            "description": "<p>String used for search optimization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profession",
            "description": "<p>Profession</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "roles",
            "description": "<p>User access roles</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>Is user deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>User create date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>User update date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "'man'",
              "'woman'"
            ],
            "optional": true,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "identities",
            "description": "<p>Social networks of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.facebookId",
            "description": "<p>User facebook id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.vkontakteId",
            "description": "<p>User vkontakte id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User access token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "refreshToken",
            "description": "<p>User refresh token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "[{param:\"refreshToken\",message:\"Valid refresh token is required\"}]",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "InvalidRefreshToken",
            "description": "<p>{param:&quot;refreshToken&quot;,message:&quot;Valid refresh token is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>{param:&quot;refreshToken&quot;,message:&quot;User not found&quot;}</p>"
          }
        ]
      }
    },
    "filename": "server/route/_access.js",
    "groupTitle": "Access"
  },
  {
    "name": "facebookProfessionalWebReg",
    "type": "GET",
    "url": "/auth/facebookProfessionalWeb",
    "title": "Web registration redirect for professional",
    "description": "<p>No xhr request</p>",
    "version": "0.0.1",
    "group": "Facebook",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/facebookProfessionalWeb'\n -X GET",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "Facebook"
  },
  {
    "name": "facebookProfessionalWebRegCallback",
    "type": "GET",
    "url": "/auth/facebookProfessionalWeb/callback",
    "title": "Web registration callback for professional",
    "description": "<p>Redirect to &quot;/&quot;. If success, then in cookies will be user object in &quot;_user&quot; field, in json stringify format</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "email",
            "description": "<p>Email list. 0 item is the main</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "_json",
            "description": "<p>User data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture",
            "description": "<p>Picture object</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data",
            "description": "<p>Picture data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data.url",
            "description": "<p>Avatar url</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.gender",
            "description": "<p>User gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>User facebook id</p>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "group": "Facebook",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/facebookProfessionalWeb/callback'\n -X GET\n -d  '{\"id\":\"13\", \"email\":\"asd@awds.asd\",\"_json\":{\"name\":\"asd\",\"first_name\":\"asd\",\"last_name\":\"asd\",\"gender\":\"male\", \"picture\":{\"data\":{\"url\":\"https://scontent.xx.fbcdn.net/v/t1.0-1/c44.44.544.544/s50x50/316295_10151906553973056_2129080216_n.jpg?oh=ef0d885653512eb85c7863adc8e3299a&oe=597651A4\"}}}}'",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "Facebook"
  },
  {
    "name": "facebookUserWebReg",
    "type": "GET",
    "url": "/auth/facebookUserWeb",
    "title": "Web registration redirect for user",
    "description": "<p>No xhr request</p>",
    "version": "0.0.1",
    "group": "Facebook",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/facebookUserWeb'\n -X GET",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "Facebook"
  },
  {
    "name": "facebookUserWebRegCallback",
    "type": "GET",
    "url": "/auth/facebookUserWeb/callback",
    "title": "Web registration callback for user",
    "description": "<p>Redirect to &quot;/&quot;. If success, then in cookies will be user object in &quot;_user&quot; field, in json stringify format</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "email",
            "description": "<p>Email list. 0 item is the main</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "_json",
            "description": "<p>User data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture",
            "description": "<p>Picture object</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data",
            "description": "<p>Picture data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data.url",
            "description": "<p>Avatar url</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.gender",
            "description": "<p>User gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>User facebook id</p>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "group": "Facebook",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/facebookUserWeb/callback'\n -X GET\n -d  '{\"id\":\"13\", \"email\":\"asd@awds.asd\",\"_json\":{\"name\":\"asd\",\"first_name\":\"asd\",\"last_name\":\"asd\",\"gender\":\"male\", \"picture\":{\"data\":{\"url\":\"https://scontent.xx.fbcdn.net/v/t1.0-1/c44.44.544.544/s50x50/316295_10151906553973056_2129080216_n.jpg?oh=ef0d885653512eb85c7863adc8e3299a&oe=597651A4\"}}}}'",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "Facebook"
  },
  {
    "name": "facebookWebAuth",
    "type": "GET",
    "url": "/auth/facebookWebAuth",
    "title": "Web login redirect",
    "description": "<p>No xhr request</p>",
    "version": "0.0.1",
    "group": "Facebook",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/facebookWebAuth'\n -X GET",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "Facebook"
  },
  {
    "name": "facebookWebAuthCallback",
    "type": "GET",
    "url": "/auth/facebookWeb/callback",
    "title": "Web login callback",
    "description": "<p>Redirect to &quot;/&quot;. If success, then in cookies will be user object in &quot;_user&quot; field, in json stringify format</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "email",
            "description": "<p>Email list. 0 item is the main</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "_json",
            "description": "<p>User data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture",
            "description": "<p>Picture object</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data",
            "description": "<p>Picture data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data.url",
            "description": "<p>Avatar url</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.gender",
            "description": "<p>User gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>User facebook id</p>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "group": "Facebook",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/facebookWeb/callback'\n -X GET\n -d  '{\"id\":\"13\", \"email\":\"asd@awds.asd\",\"_json\":{\"name\":\"asd\",\"first_name\":\"asd\",\"last_name\":\"asd\",\"gender\":\"male\", \"picture\":{\"data\":{\"url\":\"https://scontent.xx.fbcdn.net/v/t1.0-1/c44.44.544.544/s50x50/316295_10151906553973056_2129080216_n.jpg?oh=ef0d885653512eb85c7863adc8e3299a&oe=597651A4\"}}}}'",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "Facebook"
  },
  {
    "name": "vkProfessionalWebReg",
    "type": "GET",
    "url": "/auth/vkProfessionalWeb",
    "title": "Web registration redirect for professional",
    "description": "<p>No xhr request</p>",
    "version": "0.0.1",
    "group": "VK",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/vkProfessionalWeb'\n -X GET",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "VK"
  },
  {
    "name": "vkProfessionalWebRegCallback",
    "type": "GET",
    "url": "/auth/vkProfessionalWeb/callback",
    "title": "Web registration callback for professional",
    "description": "<p>Redirect to &quot;/&quot;. If success, then in cookies will be user object in &quot;_user&quot; field, in json stringify format</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "email",
            "description": "<p>Email list. 0 item is the main</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "_json",
            "description": "<p>User data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture",
            "description": "<p>Picture object</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data",
            "description": "<p>Picture data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data.url",
            "description": "<p>Avatar url</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.gender",
            "description": "<p>User gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>User vk id</p>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "group": "VK",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/vkProfessionalWeb/callback'\n -X GET\n -d  '{\"id\":\"13\", \"email\":\"asd@awds.asd\",\"_json\":{\"name\":\"asd\",\"first_name\":\"asd\",\"last_name\":\"asd\",\"gender\":\"male\", \"picture\":{\"data\":{\"url\":\"https://scontent.xx.fbcdn.net/v/t1.0-1/c44.44.544.544/s50x50/316295_10151906553973056_2129080216_n.jpg?oh=ef0d885653512eb85c7863adc8e3299a&oe=597651A4\"}}}}'",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "VK"
  },
  {
    "name": "vkUserWebReg",
    "type": "GET",
    "url": "/auth/vkUserWeb",
    "title": "Web registration redirect for user",
    "description": "<p>No xhr request</p>",
    "version": "0.0.1",
    "group": "VK",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/vkUserWeb'\n -X GET",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "VK"
  },
  {
    "name": "vkUserWebRegCallback",
    "type": "GET",
    "url": "/auth/vkUserWeb/callback",
    "title": "Web registration callback for user",
    "description": "<p>Redirect to &quot;/&quot;. If success, then in cookies will be user object in &quot;_user&quot; field, in json stringify format</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "email",
            "description": "<p>Email list. 0 item is the main</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "_json",
            "description": "<p>User data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture",
            "description": "<p>Picture object</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data",
            "description": "<p>Picture data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data.url",
            "description": "<p>Avatar url</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.gender",
            "description": "<p>User gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>User vk id</p>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "group": "VK",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/vkUserWeb/callback'\n -X GET\n -d  '{\"id\":\"13\", \"email\":\"asd@awds.asd\",\"_json\":{\"name\":\"asd\",\"first_name\":\"asd\",\"last_name\":\"asd\",\"gender\":\"male\", \"picture\":{\"data\":{\"url\":\"https://scontent.xx.fbcdn.net/v/t1.0-1/c44.44.544.544/s50x50/316295_10151906553973056_2129080216_n.jpg?oh=ef0d885653512eb85c7863adc8e3299a&oe=597651A4\"}}}}'",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "VK"
  },
  {
    "name": "vkWebAuth",
    "type": "GET",
    "url": "/auth/vkWebAuth",
    "title": "Web login redirect",
    "description": "<p>No xhr request</p>",
    "version": "0.0.1",
    "group": "VK",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/vkWebAuth'\n -X GET",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "VK"
  },
  {
    "name": "vkWebAuthCallback",
    "type": "GET",
    "url": "/auth/vkWebAuth/callback",
    "title": "Web login callback",
    "description": "<p>Redirect to &quot;/&quot;. If success, then in cookies will be user object in &quot;_user&quot; field, in json stringify format</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "email",
            "description": "<p>Email list. 0 item is the main</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "_json",
            "description": "<p>User data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture",
            "description": "<p>Picture object</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data",
            "description": "<p>Picture data</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.picture.data.url",
            "description": "<p>Avatar url</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "_json.gender",
            "description": "<p>User gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>User vk id</p>"
          }
        ]
      }
    },
    "version": "0.0.1",
    "group": "VK",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/auth/vkWebAuth/callback'\n -X GET\n -d  '{\"id\":\"13\", \"email\":\"asd@awds.asd\",\"_json\":{\"name\":\"asd\",\"first_name\":\"asd\",\"last_name\":\"asd\",\"gender\":\"male\", \"picture\":{\"data\":{\"url\":\"https://scontent.xx.fbcdn.net/v/t1.0-1/c44.44.544.544/s50x50/316295_10151906553973056_2129080216_n.jpg?oh=ef0d885653512eb85c7863adc8e3299a&oe=597651A4\"}}}}'",
        "type": "curl"
      }
    ],
    "filename": "server/route/_access.js",
    "groupTitle": "VK"
  },
  {
    "name": "UpdateUser",
    "type": "PUT",
    "url": "/api/v1/user/update",
    "title": "User update",
    "version": "0.0.1",
    "group": "user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "multipart/form-data",
            "description": "<p>Content-Type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User bearer access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "region",
            "description": "<p>Region</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "street",
            "description": "<p>Street</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "house",
            "description": "<p>House</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "flat",
            "description": "<p>Flat</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "profession",
            "description": "<p>Profession</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "facebookId",
            "description": "<p>User facebook id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "vkontakteId",
            "description": "<p>User vkontakte id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "birthday",
            "description": "<p>Birthday</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "zip",
            "description": "<p>Zip code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "skype",
            "description": "<p>Skype</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "avatar",
            "description": "<p>Avatar image</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "removeAvatar",
            "description": "<p>Remove avatar</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://localhost:3000/api/v1/access/register'\n -H \"Content-Type: application/json\"\n -X PUT\n -d  '{\"email\":\"vasya@ya.com\",\"firstName\":\"Vasya\",\"lastName\":\"Pupkin\"}'\n      -F 'pictureList=@\\\"myfile.jpg\\\"'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"createdAt\":\"2017-05-17T08:41:41.510Z\",\"updatedAt\":\"2017-05-19T11:39:16.970Z\",\"isDeleted\":false,\"roles\":[\"user\"],\"_id\":\"591c0cc5407eba1706aeb43e\",\"email\":\"test2@mail.com\",\"firstName\":\"title1\",\"lastName\":\"testAdmin\",\"address\":{\"city\":\"testAdmin\",\"searchLocation\":\"testAdmin\"},\"identities\":{\"vkontakteId\":null,\"facebookId\":null},\"avatar\":\"http://res.cloudinary.com/diu5kwhe7/image/upload/v1495193958/cgato7gb0athnkai15pb.jpg\"}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Users id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>avatar</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.region",
            "description": "<p>Region</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.city",
            "description": "<p>City</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.street",
            "description": "<p>Street</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.house",
            "description": "<p>House</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.flat",
            "description": "<p>Flat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address.searchLocation",
            "description": "<p>String used for search optimization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profession",
            "description": "<p>Profession</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "roles",
            "description": "<p>User access roles</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>Is user deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>User create date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>User update date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "'man'",
              "'woman'"
            ],
            "optional": true,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "identities",
            "description": "<p>Social networks of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.facebookId",
            "description": "<p>User facebook id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "identities.vkontakteId",
            "description": "<p>User vkontakte id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User access token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "refreshToken",
            "description": "<p>User refresh token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "[{param:\"email\",message:\"Valid email is required\"}]",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>{param:&quot;email&quot;,message:&quot;Valid email is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "FirstNameRequired",
            "description": "<p>{param: &quot;firstName&quot;, message: &quot;First Name is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "LastNameRequired",
            "description": "<p>{param: &quot;lastName&quot;, message: &quot;Last Name is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "GenderRequired",
            "description": "<p>{param: &quot;gender&quot;, message: &quot;Gender is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "ProfessionRequired",
            "description": "<p>{param: &quot;profession&quot;, message: &quot;Profession is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "RegionRequired",
            "description": "<p>{param: &quot;region&quot;, message: &quot;Valid region is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "CityRequired",
            "description": "<p>{param: &quot;city&quot;, message: &quot;Valid city is required&quot;}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "AvatarRequired",
            "description": "<p>{param : 'avatar', message : 'Upload error'}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>{param : 'email', message : 'User not found'}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "AccessTokenIncorrect",
            "description": "<p>{ param : 'accessToken', message : 'Access token is incorrect'}</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "AccessTokenExpired",
            "description": "<p>{ param : 'accessToken', message : 'Access token is expired'}</p>"
          }
        ]
      }
    },
    "filename": "server/route/_user.js",
    "groupTitle": "user"
  }
] });
