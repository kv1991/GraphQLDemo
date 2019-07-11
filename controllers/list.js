//这个文件对应操作list数据的控制器，单独拿出来写是为了方便后续项目复杂化的模块化管理。
const mongoose = require('mongoose')

const List = mongoose.model('List')
// 获取所有数据
const getAllList = async (ctx, next) => {
  const Lists = await List.find({}).sort({date:-1}) // 数据查询
  if (Lists.length) {
    ctx.body = {
      success: true,
      list: Lists
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}
// 新增
const addOne = async (ctx, next) => {
  // 获取请求的数据
  const opts = ctx.request.body
  
  const list = new List(opts)
  const saveList = await list.save() // 保存数据
  console.log(saveList)
  // 简单判断一下 是否保存成功，然后返回给前端
  if (saveList) {
    ctx.body = {
      success: true,
      id: opts.id
    }
  } else {
    ctx.body = {
      success: false,
      id: opts.id
    }
  }
}

const editOne = async (ctx, next) => {
  const obj = ctx.request.body
  let hasError = false
  let error = null
  List.findOne({id: obj.id}, (err, doc) => {
  	if(err) {
  		hasError = true
  		error = err
  	} else {
  		doc.title = obj.title;
  		doc.desc = obj.desc;
  		doc.date = obj.date;
  		doc.save();
  	}
  })
  if (hasError) {
  	ctx.body = {
      success: false,
      id: obj.id
    }
  } else {
  	ctx.body = {
	  success: true,
    id: obj.id
	}
  }
}

const tickOne = async (ctx, next) => {
  const obj = ctx.request.body
  let hasError = false
  let error = null
  List.findOne({id: obj.id}, (err, doc) => {
  	if(err) {
  		hasError = true
  		error = err
  	} else {
  		doc.checked = obj.checked;
  		doc.save();
  	}
  })
  if (hasError) {
  	ctx.body = {
      success: false,
      id: obj.id
    }
  } else {
  	ctx.body = {
	  success: true,
    id: obj.id
	}
  }
}

const delOne = async (ctx, next) => {
  const obj = ctx.request.body
  let hasError = false
  let msg = null
  List.remove({id: obj.id}, (err, doc) => {
  	if(err) {
  		hasError = true
  		msg = err
  	} else {
  		msg = doc
  	}
  })
  if (hasError) {
  	ctx.body = {
      success: false,
      id: obj.id
    }
  } else {
  	ctx.body = {
  	  success: true,
      id: obj.id
  	}
  }
}

module.exports = {
  getAllList,
  addOne,
  editOne,
  delOne,
  tickOne
}




