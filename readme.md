# light-api-loader

removing a debug api when packing the code in the production environment

##  Example
```javascript
<!-- DevApi.js -->
export default {
  a: 'trueExam.do?id=9dadc086-64a0-49a7-81b1-10d00ba82682',
  b: 'trueExam.do?id=9dadc086-64a0-49a7-81b1-10d00ba82112',  
}

      ↓ ↓ ↓ ↓

export default {}
```

##  Usage

### Install
```cmd
npm install light-api-loader
```

### Config
add as webpack loader in webpack config file
```javascript
{
  test: /\.(js)$/,
  loader: 'light-api-loader',
  include: [resolve('src')],
  options: {
    fileName: 'DevApi' // defined dev api file name
  }
}
```