const performCalculation = array => {
  let ans = [];
  let a = array;
  let keys = ['/', '*', '-', '+'];

  let desc;
  let desc1;

  if (a.includes('x') || a.includes('÷')) {
    let regexX = /[\x]/g;
    let regexY = /[\\÷]/g;
    desc = a.join('').replace(regexX, '*');
    desc1 = desc.replace(regexY, '/');
    a = Array.from(desc1);
  }

  const res = a.reduce(
    (i => (r, s) => {
      if (i === 0) {
        r.push([]);
        i++;
      }
      if (keys.includes(s)) {
        r.push([]);
        i++;
      }
      r[r.length - 1]?.push(s);
      return r;
    })(0),
    [],
  );
  let s = res.shift();
  let b = s.join('');

  let num = [];
  let operations = [];
  for (let i = 0; i < res.length; i++) {
    let op = res[i].shift();
    operations.push(op);
    let opp = res[i].join('');
    num.push(opp);
  }
  ans.push(b);
  let fr = ans.concat(num);
  // console.log(operations);
  // console.log(fr);

  let finalString = '';
  let finaLVAL = [];

  // perform loop on second list
  fr.forEach(function (value, index) {
    let operator = operations[index];
    let valueToOperate = value;
    // assign value together
    finalString = finalString + ' ' + valueToOperate + ' ' + operator + ' ';
  });
  // get rid of leading and trailing spaces
  finalString = finalString.trim();
  // split using spaces between them
  /// this will help us know any [UNDEFINED] adn empy list present
  let list = finalString.split(' ');
  // remove any undefined and empty if available
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    // if (element != '') {
    if (element !== 'undefined') {
      finaLVAL.push(element);
    }
    // }
  }
  // convert array to string
  let response = finaLVAL.join('');

  let ress = response;
  let newRess;
  let newRess1;
  if (ress.includes('*') || ress.includes('/')) {
    let regex1 = /[\\*]/g;
    let regex2 = /[\\/]/g;
    newRess = ress.replace(regex1, 'x');
    newRess1 = newRess.replace(regex2, '÷');
    newRess = newRess1;
  }
  if (!newRess) {
    newRess = ress;
  }
  // eslint-disable-next-line no-eval
  const calcResult = eval(response);
  return {calcResult, newRess};
};

module.exports = performCalculation;
