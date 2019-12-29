generate_model_controller() {

fileName="${1}/${2}.ts"


echo ""
echo "generating controllers"

cat > $fileName << EOF
"use strict"
import createController from '../utils/create-controller'

export default createController({
    model: "$2",
    middleware: {
      getOne: [],
      getAll: [],
      create: [],
      destroy: [],
      update: []
    },
    nestedControllers: []
});

EOF

prettier --write $fileName

}