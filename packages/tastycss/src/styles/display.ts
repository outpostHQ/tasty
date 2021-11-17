export function displayStyle({ display, hide }): {display: any;
}  {
  return { display: !hide ? display : 'none' };
}

displayStyle.__lookupStyles = ['display', 'hide'];
