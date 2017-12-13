const localesReg = new RegExp('/en/|/zh/');
const apiReg = new RegExp('/api/');

export function getpruepath(pathname) {
  let pruepath = pathname.replace(/\/$/, '');
  pruepath = pruepath.replace(/.*?(\.html)$/, '');
  return pruepath;
}

export function getlocalname(pruepath) {
  let localname = 'zh';

  if (localesReg.test(pruepath)) {
    localname = pruepath.split('/')[1];
  }

  return localname;
}

export function removelocal(pathname) {
  const pruepath = getpruepath(pathname);

  if (localesReg.test(pruepath)) {
    const localname = getlocalname(pruepath);
    const localnameReg = new RegExp(`/${localname}`);

    return pruepath.replace(localnameReg, '');
  } else {
    return pruepath;
  }
}

export function removelocalkeepmain(pathname) {
  const pruepath = removelocal(pathname);
  const keeppath = pruepath.replace(/(\/.*?)\/.*/, '$1');

  return keeppath;
}

export function removelocalkeepsub(pathname) {
  const pruepath = removelocal(pathname);
  const keeppath = pruepath.replace(/(\/.*?\/.*?)\/.*/, '$1');

  return keeppath;
}

export function removelocalkeepthree(pathname) {
  const pruepath = removelocal(pathname);
  const keeppath = pruepath.replace(/(\/.*?\/.*?\/.*?)\/.*/, '$1');

  return keeppath;
}

export function historyreplace(history, pruepath, search) {
  if (!localesReg.test(pruepath)) {
    if (pruepath === '' || pruepath === '/') {
      history.replace(`/zh/index${search}`);
    } else {
      history.replace(`/zh${pruepath}${search}`);
    }
  }
}

export function localMiddle(req, res, next) {
  const pruepath = getpruepath(req._parsedUrl.pathname);

  if (apiReg.test(pruepath)) {
    next();
  } else if (localesReg.test(pruepath)) {
    next();
  } else if (pruepath === '') {
    res.redirect('/zh/index');
  } else {
    res.redirect(`/zh${pruepath}`);
  }
}
