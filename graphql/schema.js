const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  graphql,
  GraphQLInputType,
  GraphQLNonNull,
  IsOutputType,
  isInputType
} = require('graphql')

const { addOne, editOne, delOne, tickOne }  = require ('../controllers/graphqlHandler')
const mongoose = require('mongoose')

const list = mongoose.model('List')

const objType = new GraphQLObjectType({
  name: 'meta',
  fields: {
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    }
  }
})

let ListType = new GraphQLObjectType({
  name: 'List',
  fields: {
    _id: {
      type: GraphQLID,
    },
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    desc: {
      type: GraphQLString,
    },
    date: {
      type: GraphQLString,
    },
    checked: {
      type: GraphQLBoolean,
    },
    meta: {
      type: objType,
    }
  }
})

const listFields = {
  type: new GraphQLList(ListType),
  args: {},
  resolve (root, params, options) {
    return list.find({}).exec() // 数据库查询
  }
}

let queryType = new GraphQLObjectType({
  name: 'getAllList',
  fields: {
    lists: listFields,
  }
})

const outputType = new GraphQLObjectType({
  name: 'output',
  fields: () => ({
    id: { type: GraphQLString },
    success: { type: GraphQLBoolean }
  })
})
const inputType = new GraphQLInputObjectType({
  name: 'input',
  fields: () => ({
    id:      { type: GraphQLString  },
    desc:    { type: GraphQLString  },
    date:    { type: GraphQLString  },
    title:   { type: GraphQLString  },
    checked: { type: GraphQLBoolean },
  })
})

let MutationType = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    addOne: {
      type: outputType,
      description: 'add',
      args: {
        listObj: { type: inputType }
      },
      resolve: (value, args) => addOne(args.listObj)
    },
    delOne: {
      type: outputType,
      description: 'del',
      args: {
        id: { type: GraphQLString }
      },
      resolve: (value, args) => delOne(args)
    },
  }),
  editOne: {
    type: outputType,
    description: 'edit',
    args: {
      listObj: { type: inputType }
    },
    resolve: (value, args) => editOne(args.listObj)
  },
  tickOne: {
    type: outputType,
    description: 'tick',
    args: {
      id: {
        type: GraphQLString
      },
      checked: {
        type: GraphQLBoolean
      }
    },
    resolve: (value, args) => tickOne(args.listObj)
  }
})

module.exports =  new GraphQLSchema({
  query: queryType,
  mutation: MutationType
})