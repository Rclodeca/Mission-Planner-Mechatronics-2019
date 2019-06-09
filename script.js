

//Start node constructor class
function StartNode() {
    this.addOutput("Start", "string");
    this.task = {
        type: "start",
        name: "start"
    }
}

//name to show
StartNode.title = "Start";
StartNode.position = [10, 50];
//StartNode.size = [100, 50];

//function to call when the node is executed
StartNode.prototype.onExecute = function() {
   this.setOutputData(0, 1);
}
//register in the system
LiteGraph.registerNodeType("basic/start", StartNode);


//Mission node constructor class
function MissionNode() {
    this.addInput("Input", "string");
    this.addOutput("Next", "string");

    this.slider_value = 0.5;
    this.number_value = 0;
    this.combo_value = "red";

    this.params = [
        {id: 0, type: "slider", value: this.slider_value},
        {id: 1, type: "number", value: this.number_value},
        {id: 2, type: "combo", value: this.combo_value}
    ];

    this.slider_widget = this.addWidget(
        "slider",
        "Slider", 
        this.slider_value, 
        function(value, widget, node){
            node.slider_value = value;
            node.params[0].value = value;
        }, 
        {min: 0, max: 1}
    );
    
    this.number_widget = this.addWidget(
        "number",
        "Number", 
        this.number_value, 
        function(value, widget, node){
            node.number_value = value;
            node.params[1].value = value;
        }, 
        { min: 0, max: 100, step: 1} 
    );

    this.combo_widget = this.addWidget(
        "combo",
        "Combo", 
        this.combo_value, 
        function(value, widget, node){
            node.combo_value = value;
            node.params[2].value = value;
        }, 
        { values:["red","green","blue"]} 
    );

    this.test_widget = this.addWidget("text","input","");
    this.toggle_widget = this.addWidget("toggle", "check");

    this.serialize_widgets = true;
}

//name to shown
MissionNode.title = "Mission";
MissionNode.position = [10, 50];
MissionNode.size = [300, 500];

//function to call when the node is executed
MissionNode.prototype.onExecute = function() {
    var A = this.getInputData(0);
    if (A === undefined)
        A = 0;
    this.setOutputData(0, A);
}
//register in the system
LiteGraph.registerNodeType("basic/mission", MissionNode);


//------------------------------------------------------------------------
//Define Drive Mission
function DriveMissionNode() {
    this.addInput("Input", "string");
    this.addOutput("Next", "string");

    // this.timeout = 15.0;
    // this.buffer_zonet = 2.0;
    // this.wait_time = 0.5;
    // this.roll = 0.0;
    // this.pitch = 0.0;
    // this.yaw = 135.0;
    // this.x_pos = 1.3;
    // this.y_pos = 20.0;
    // this.depth = 5.0;
    // this.pos_ref = "absolute";
    
    this.task = {
        type: "Drive",
        name: "",
        timeout: 15.0,
        buffer_zone: 2.0,
        wait_time: 0.5,
        desired_pos: {
            roll: 0.0,
            pitch: 0.0,
            yaw: 135.0,
            x_pos: 1.3,
            y_pos: 20.0,
            depth: 5.0
        },
        pos_ref: "absolute"    
    };

    this.timeout_widget = this.addWidget("text","timeout", this.task.timeout.toString(), 
        function(value, widget, node){node.task.timeout = Number(value);});
    
    this.buffer_zone_widget = this.addWidget("text","buffer zone", this.task.buffer_zone.toString(), 
        function(value, widget, node){node.task.buffer_zone = Number(value);});

    this.wait_time_widget = this.addWidget("text","wait time", this.task.wait_time.toString(), 
        function(value, widget, node){node.task.wait_time = Number(value);});

    this.roll_widget = this.addWidget("text","roll", this.task.desired_pos.roll.toString(), 
        function(value, widget, node){node.task.desired_pos.roll = Number(value);});

    this.pitch_widget = this.addWidget("text", "pitch", this.task.desired_pos.pitch.toString(), 
        function(value, widget, node){node.task.desired_pos.pitch = Number(value);});

    this.yaw_widget = this.addWidget("text","yaw", this.task.desired_pos.yaw.toString(), 
        function(value, widget, node){node.task.desired_pos.yaw = Number(value);});

    this.x_pos_widget = this.addWidget("text","x pos", this.task.desired_pos.x_pos.toString(), 
        function(value, widget, node){node.task.desired_pos.x_pos = Number(value);});

    this.y_pos_widget = this.addWidget("text","y pos", this.task.desired_pos.y_pos.toString(), 
        function(value, widget, node){node.task.desired_pos.y_pos = Number(value);});

    this.depth_widget = this.addWidget("text","depth", this.task.desired_pos.depth.toString(), 
        function(value, widget, node){node.task.desired_pos.depth = Number(value);});

    this.pos_ref_widget = this.addWidget("combo","pos ref", this.task.pos_ref, 
        function(value, widget, node){node.task.pos_ref = value;},{values:["absolute", "relative"]});


    // this.combo_widget = this.addWidget(
    //     "combo",
    //     "Combo", 
    //     this.combo_value, 
    //     function(value, widget, node){
    //         node.combo_value = value;
    //         node.params[2].value = value;
    //     }, 
    //     { values:["red","green","blue"]} 
    // );

    // this.test_widget = this.addWidget("text","input","");
    // this.toggle_widget = this.addWidget("toggle", "check");

    this.serialize_widgets = true;
}

//name to shown
DriveMissionNode.title = "drive_1";
DriveMissionNode.position = [10, 50];
DriveMissionNode.size = [300, 500];

//function to call when the node is executed
DriveMissionNode.prototype.onExecute = function() {
    var A = this.getInputData(0);
    if (A === undefined)
        A = 0;
    this.setOutputData(0, A);
}
//register in the system
LiteGraph.registerNodeType("basic/mission/drive", DriveMissionNode);



//define the graph and canvas
var graph = new LGraph();
var canvas = new LGraphCanvas("#mycanvas", graph);

//create start node
var node_start = LiteGraph.createNode("basic/start");
node_start.pos = [100, 100];
node_start.title = "Start";
graph.add(node_start);

//create node 1
// var node_mission_1 = LiteGraph.createNode("basic/mission");
// node_mission_1.pos = [100, 200];
// node_mission_1.title = "Mission 1";
// node_mission_1.size = [200, 150];
// graph.add(node_mission_1);

//create drive node
var node_drive_mission = LiteGraph.createNode("basic/mission/drive");
node_drive_mission.pos = [100,300];
node_drive_mission.title = "drive_1",
node_drive_mission.size = [200,350];
graph.add(node_drive_mission);
node_drive_mission.collapse();

// //create node 2
// var node_mission_2 = LiteGraph.createNode("basic/mission");
// node_mission_2.pos = [100, 300];  
// node_mission_2.title = "Mission 2";
// node_mission_2.size = [200, 150];
// graph.add(node_mission_2);

// //create node 3
// var node_mission_3 = LiteGraph.createNode("basic/mission");
// node_mission_3.pos = [100, 400];
// node_mission_3.title = "Mission 3";
// node_mission_3.size = [200, 150];
// graph.add(node_mission_3);

// //create node 4
// var node_mission_4 = LiteGraph.createNode("basic/mission");
// node_mission_4.pos = [100, 500];
// node_mission_4.title = "Mission 4";
// node_mission_4.size = [200, 150];
// graph.add(node_mission_4);


graph.start();
let data = graph.serialize();


//define serialize button functionality
document.getElementById("convertButton").onclick = serializeData;
function serializeData() {
    let serialized_graph = graph.serialize();

    let extracted_data = {
        links:[],
        missions:[]
    };

    let executed_nodes = [];
    let links = serialized_graph.links;
    for(let i = 0; i < links.length; i++){
        extracted_data.links[i] = [];
        extracted_data.links[i][0] = links[i][1];
        extracted_data.links[i][1] = links[i][3];

        let temp = links[i][1];
        if(!executed_nodes.includes(temp)){
            executed_nodes.push(temp);
        }
        let temp2 = links[i][3];
        if(!executed_nodes.includes(temp2)){
            executed_nodes.push(temp2);
        }
    }
    
    for(let i = 0; i < executed_nodes.length; i++){
        let node = graph.getNodeById(executed_nodes[i]);
        if(node === undefined){
            continue;
        }

        let mission = {
            id: node.id,
            task: node.task,
        };
        mission.task.name = node.title || mission.task.type || "";
        extracted_data.missions[i] = mission;
    }
    
    if(extracted_data.links && extracted_data.links.length > 0){
        console.log(extracted_data);
    }
}