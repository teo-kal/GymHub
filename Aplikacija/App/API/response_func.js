exports.SetStatusAndMessage = (res, status, msg) =>{
    res.status = status;
    res.message = msg;
    return res;
}

exports.SetStatusAndBody = (res,status,body) =>{
    res.status = status;
    res.body = body;
    return res;
}