SPECIFICITY.compare = function(s1, s2){

  var a1 = s1.split(','),
      a2 = s2.split(','),
      i;

  if (a1.length != a2.length) {
    a1 = a1.reverse();
    a2 = a2.reverse();
    if (a1.length < a2.length) {
      for (i = a1.length; i < a2.length; i++) {
        a1[i] = '0';
      }
    } else if (a1.length > a2.length) {
      for (i = a2.length; i < a1.length; i++) {
        a2[i] = '0';
      }
    }
    a1 = a1.reverse();
    a2 = a2.reverse();
  }

  var found = false;
  for(i = 0; i < a1.length; i++) {
    if (parseInt(a1[i]) > parseInt(a2[i])) {
      return 1;
    } else if (parseInt(a1[i]) < parseInt(a2[i])) {
      return -1;
    }
  }

  return 0;
};