const db = require("../db/index");

exports.getbook = (req, res) => {
  const sql = `select * from ev_book`;
  db.query(sql, function (err, results) {
    if (err) {
      return res.cc(err);
    }
    res.send({
      status: 0,
      message: "获取成功",
      data: results,
    });
  });
};
exports.delbook = (req, res) => {
  const sql = `delete from ev_book where id=?`;
  db.query(sql, req.params.id, function (err, results) {
    if (err) return res.cc(err);
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc("删除失败！");
    res.cc("删除成功");
  });
};
exports.postbook = (req, res) => {
  const bookinfo = req.body;
  const sql = `insert into ev_book set ?`;
  db.query(
    sql,
    {
      bname: bookinfo.bname,
      bauthor: bookinfo.bauthor,
      bprice: bookinfo.bprice,
      bintroduce: bookinfo.bintroduce,
    },
    function (err, results) {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) {
        return res.cc("添加失败");
      }
      res.cc("添加成功", 0);
    }
  );
};
exports.updatebook = (req,res)=>{
    const sql =`update ev_book set ? where id=?`
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        if(err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改信息失败！')
        return res.cc('修改成功',0)
    })
}

exports.getId = (req,res)=>{
  const sql = `select * from ev_book where id=?`;
  db.query(sql,req.params.id,function (err,results){
    if(err) return res.cc(err)
    res.send({
      status: 0,
      message: "获取成功",
      data: results,
    });
})
}
