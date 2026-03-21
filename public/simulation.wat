(module
 (type $0 (func (param i32) (result i32)))
 (type $1 (func (param i32 i32) (result i32)))
 (type $2 (func (result i32)))
 (type $3 (func (param i32 i32 i32) (result i32)))
 (type $4 (func))
 (type $5 (func (param i32)))
 (type $6 (func (param i32 i32)))
 (type $7 (func (param i32 i32 i32 i32) (result i32)))
 (type $8 (func (param i32 i32 i32)))
 (type $9 (func (param i32 i32 i32 i32 i32 i32) (result i32)))
 (type $10 (func (param i32 i32 i32 i32 i32) (result i32)))
 (type $11 (func (param i32 i32 i32 i32)))
 (type $12 (func (param i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $13 (func (param i32 i32 i64)))
 (type $14 (func (result f64)))
 (type $15 (func (param i32 i32 i32 i32 i32 i32 i32 i32) (result i32)))
 (type $16 (func (param i32 f64 f64) (result f64)))
 (type $17 (func (param f64 f64) (result f64)))
 (type $18 (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)))
 (type $19 (func (param i32 i32 i32 i32 i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "env" "seed" (func $assembly/sim/behavior/rng/hostSeed (result f64)))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 36264))
 (global $assembly/sim/state/visitorState/vSatisfaction (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vState (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/heightData (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/gridData (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vNeeds (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vY (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vX (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vTarget (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/tickCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vTimer (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instActive (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instTemplateId (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instCurrentRiders (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vLevel (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/pathLevelData (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/rngState (mut i32) (i32.const 12345))
 (global $assembly/sim/state/visitorState/vWallet (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vStuckTimer (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechanicCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vExcitement (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instanceCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/activeVisitors (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/pukeData (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/upperPathVariantData (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vQueueY (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vQueueX (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instBroken (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechTarget (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechX (mut i32) (i32.const 0))
 (global $assembly/sim/state/pathfindingState/bfsQueue (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityTargetVisitor (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechRepairTimer (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/upperPathHeightData (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vNausea (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instCapacity (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerPatrolY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerPatrolX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerCleanTimer (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerTargetY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerTargetX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechActive (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/toSpace (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vCriminal (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instQueueLength (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityPatrolY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityPatrolX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityActive (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerAreaY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerAreaX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerAreaCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/parkAttractiveness (mut i32) (i32.const 100))
 (global $assembly/sim/state/employeeState/entertainerAreaY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerAreaX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerAreaCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerActive (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityAreaY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityAreaX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityAreaCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerPatrolY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerPatrolX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerActive (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechAreaY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechAreaX (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechAreaCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechPatrolY (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechPatrolX (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/cornerMaskData (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instRepairTicks (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplCategory (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/budget (mut i32) (i32.const 10000))
 (global $assembly/sim/state/employeeState/entertainerGuestsCheered (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/upperRampDirData (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/iter (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/state (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vQueueOrder (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instMonthlyRevenue (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instEntranceY (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instEntranceX (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instRotation (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/nextEmployeeUid (mut i32) (i32.const 1))
 (global $assembly/sim/state/employeeState/securityIncidentsHandled (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerPathsCleaned (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechRepairsCompleted (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/pathLevelRampData (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/rampDirData (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/total (mut i32) (i32.const 0))
 (global $assembly/sim/state/pathfindingState/bfsVisited (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vUmbrellaTimer (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vPukeTimer (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instPopularity (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instEstimatedWaitTicks (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instTotalRevenue (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instTotalVisitors (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instTicketPrice (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplFootprintH (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplFootprintW (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/visitCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/pathfindingState/bfsParent (mut i32) (i32.const 0))
 (global $assembly/sim/state/pathfindingState/bfsDist (mut i32) (i32.const 0))
 (global $assembly/sim/noise/perm (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vBalloonTimer (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vCrimeCooldown (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vCrimeTimer (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vExcitementTolerance (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instExitY (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instExitX (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instY (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instX (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplAppeal (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplBuildPrice (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerHiredTick (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/entertainerUid (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityHiredTick (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/securityUid (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerHiredTick (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/cleanerUid (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechHiredTick (mut i32) (i32.const 0))
 (global $assembly/sim/state/employeeState/mechUid (mut i32) (i32.const 0))
 (global $assembly/sim/noise/G2 (mut f64) (f64.const 0))
 (global $assembly/sim/noise/permMod12 (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vCrowdComplaintCooldown (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/instBuildTick (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplRideTicks (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/totalExpense (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/entranceTicket (mut i32) (i32.const 5))
 (global $assembly/sim/state/gridState/TERRAIN_MAX_BUILD_HEIGHT (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/TERRAIN_BASE_HEIGHT (mut i32) (i32.const 0))
 (global $assembly/sim/state/gridState/TERRAIN_LEVELS_DOWN (mut i32) (i32.const 4))
 (global $~lib/rt/itcms/threshold (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/spawnCooldown (mut i32) (i32.const 0))
 (global $assembly/sim/state/visitorState/vPaid (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/templateCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplCapacity (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplTicketPrice (mut i32) (i32.const 0))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/fromSpace (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplNauseaGain (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplRequiredExcitement (mut i32) (i32.const 0))
 (global $assembly/sim/state/attractionState/tmplMonthlyCost (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/totalIncome (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/isRainingNow (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/vandalismCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/theftCount (mut i32) (i32.const 0))
 (global $assembly/sim/state/parkState/criminalRatePerThousand (mut i32) (i32.const 2))
 (global $assembly/sim/state/gridState/TERRAIN_LEVELS_UP (mut i32) (i32.const 4))
 (global $~lib/rt/itcms/pinSpace (mut i32) (i32.const 0))
 (global $assembly/sim/noise/F2 (mut f64) (f64.const 0))
 (global $assembly/sim/noise/noiseInitialized (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 3456))
 (memory $0 1)
 (data $0 (i32.const 1036) ",")
 (data $0.1 (i32.const 1048) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $1 (i32.const 1084) "<")
 (data $1.1 (i32.const 1096) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00s\00t\00a\00t\00i\00c\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $2 (i32.const 1148) "<")
 (data $2.1 (i32.const 1160) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $3 (i32.const 1212) "<")
 (data $3.1 (i32.const 1224) "\02\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s")
 (data $6 (i32.const 1340) "<")
 (data $6.1 (i32.const 1352) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $7 (i32.const 1404) ",")
 (data $7.1 (i32.const 1416) "\02\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s")
 (data $9 (i32.const 1484) "<")
 (data $9.1 (i32.const 1496) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data $10 (i32.const 1548) "|")
 (data $10.1 (i32.const 1560) "\07\00\00\00`")
 (data $10.2 (i32.const 1574) "\f0?\00\00\00\00\00\00\f0\bf\00\00\00\00\00\00\f0?\00\00\00\00\00\00\f0\bf\00\00\00\00\00\00\f0?\00\00\00\00\00\00\f0\bf")
 (data $10.3 (i32.const 1638) "\f0?\00\00\00\00\00\00\f0\bf")
 (data $11 (i32.const 1676) "|")
 (data $11.1 (i32.const 1688) "\07\00\00\00`")
 (data $11.2 (i32.const 1718) "\f0?\00\00\00\00\00\00\f0?\00\00\00\00\00\00\f0\bf\00\00\00\00\00\00\f0\bf\00\00\00\00\00\00\f0?\00\00\00\00\00\00\f0\bf\00\00\00\00\00\00\f0?\00\00\00\00\00\00\f0?\00\00\00\00\00\00\f0\bf\00\00\00\00\00\00\f0\bf")
 (data $12 (i32.const 1804) "\1c\04")
 (data $12.1 (i32.const 1816) "\06\00\00\00\00\04\00\00\97\00\00\00\a0\00\00\00\89\00\00\00[\00\00\00Z\00\00\00\0f\00\00\00\83\00\00\00\r\00\00\00\c9\00\00\00_\00\00\00`\00\00\005\00\00\00\c2\00\00\00\e9\00\00\00\07\00\00\00\e1\00\00\00\8c\00\00\00$\00\00\00g\00\00\00\1e\00\00\00E\00\00\00\8e\00\00\00\08\00\00\00c\00\00\00%\00\00\00\f0\00\00\00\15\00\00\00\n\00\00\00\17\00\00\00\be\00\00\00\06\00\00\00\94\00\00\00\f7\00\00\00x\00\00\00\ea\00\00\00K\00\00\00\00\00\00\00\1a\00\00\00\c5\00\00\00>\00\00\00^\00\00\00\fc\00\00\00\db\00\00\00\cb\00\00\00u\00\00\00#\00\00\00\0b\00\00\00 \00\00\009\00\00\00\b1\00\00\00!\00\00\00X\00\00\00\ed\00\00\00\95\00\00\008\00\00\00W\00\00\00\ae\00\00\00\14\00\00\00}\00\00\00\88\00\00\00\ab\00\00\00\a8\00\00\00D\00\00\00\af\00\00\00J\00\00\00\a5\00\00\00G\00\00\00\86\00\00\00\8b\00\00\000\00\00\00\1b\00\00\00\a6\00\00\00M\00\00\00\92\00\00\00\9e\00\00\00\e7\00\00\00S\00\00\00o\00\00\00\e5\00\00\00z\00\00\00<\00\00\00\d3\00\00\00\85\00\00\00\e6\00\00\00\dc\00\00\00i\00\00\00\\\00\00\00)\00\00\007\00\00\00.\00\00\00\f5\00\00\00(\00\00\00\f4\00\00\00f\00\00\00\8f\00\00\006\00\00\00A\00\00\00\19\00\00\00?\00\00\00\a1\00\00\00\01\00\00\00\d8\00\00\00P\00\00\00I\00\00\00\d1\00\00\00L\00\00\00\84\00\00\00\bb\00\00\00\d0\00\00\00Y\00\00\00\12\00\00\00\a9\00\00\00\c8\00\00\00\c4\00\00\00\87\00\00\00\82\00\00\00t\00\00\00\bc\00\00\00\9f\00\00\00V\00\00\00\a4\00\00\00d\00\00\00m\00\00\00\c6\00\00\00\ad\00\00\00\ba\00\00\00\03\00\00\00@\00\00\004\00\00\00\d9\00\00\00\e2\00\00\00\fa\00\00\00|\00\00\00{\00\00\00\05\00\00\00\ca\00\00\00&\00\00\00\93\00\00\00v\00\00\00~\00\00\00\ff\00\00\00R\00\00\00U\00\00\00\d4\00\00\00\cf\00\00\00\ce\00\00\00;\00\00\00\e3\00\00\00/\00\00\00\10\00\00\00:\00\00\00\11\00\00\00\b6\00\00\00\bd\00\00\00\1c\00\00\00*\00\00\00\df\00\00\00\b7\00\00\00\aa\00\00\00\d5\00\00\00w\00\00\00\f8\00\00\00\98\00\00\00\02\00\00\00,\00\00\00\9a\00\00\00\a3\00\00\00F\00\00\00\dd\00\00\00\99\00\00\00e\00\00\00\9b\00\00\00\a7\00\00\00+\00\00\00\ac\00\00\00\t\00\00\00\81\00\00\00\16\00\00\00\'\00\00\00\fd\00\00\00\13\00\00\00b\00\00\00l\00\00\00n\00\00\00O\00\00\00q\00\00\00\e0\00\00\00\e8\00\00\00\b2\00\00\00\b9\00\00\00p\00\00\00h\00\00\00\da\00\00\00\f6\00\00\00a\00\00\00\e4\00\00\00\fb\00\00\00\"\00\00\00\f2\00\00\00\c1\00\00\00\ee\00\00\00\d2\00\00\00\90\00\00\00\0c\00\00\00\bf\00\00\00\b3\00\00\00\a2\00\00\00\f1\00\00\00Q\00\00\003\00\00\00\91\00\00\00\eb\00\00\00\f9\00\00\00\0e\00\00\00\ef\00\00\00k\00\00\001\00\00\00\c0\00\00\00\d6\00\00\00\1f\00\00\00\b5\00\00\00\c7\00\00\00j\00\00\00\9d\00\00\00\fe\00\00\00\9d\00\00\00s\00\00\00-\00\00\00B\00\00\00\b8\00\00\00\b4\00\00\00e\00\00\00\1d\00\00\00\7f\00\00\00\04\00\00\00\96\00\00\00\fe\00\00\00\8a\00\00\00\ec\00\00\00\cd\00\00\00]\00\00\00\de\00\00\00r\00\00\00C\00\00\00\1d\00\00\00\18\00\00\00H\00\00\00\f3\00\00\00\8d\00\00\00\80\00\00\00\c3\00\00\00N\00\00\00B\00\00\00\d7\00\00\00=\00\00\00\9c")
 (data $13 (i32.const 2860) ",")
 (data $13.1 (i32.const 2872) "\06\00\00\00\10\00\00\00\01\00\00\00\ff\ff\ff\ff")
 (data $14 (i32.const 2908) ",")
 (data $14.1 (i32.const 2920) "\06\00\00\00\10")
 (data $14.2 (i32.const 2936) "\01\00\00\00\ff\ff\ff\ff")
 (data $15 (i32.const 2956) ",")
 (data $15.1 (i32.const 2968) "\06\00\00\00\10\00\00\00\01\00\00\00\ff\ff\ff\ff")
 (data $16 (i32.const 3004) ",")
 (data $16.1 (i32.const 3016) "\06\00\00\00\10")
 (data $16.2 (i32.const 3032) "\01\00\00\00\ff\ff\ff\ff")
 (data $17 (i32.const 3052) "<")
 (data $17.1 (i32.const 3064) "\01\00\00\00 \00\00\00\00\00\00\00\ff\ff\ff\ff\01")
 (data $17.2 (i32.const 3092) "\01\00\00\00\ff\ff\ff\ff")
 (data $18 (i32.const 3116) ",")
 (data $18.1 (i32.const 3128) "\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $19 (i32.const 3164) "<")
 (data $19.1 (i32.const 3176) "\01\00\00\00 \00\00\00\00\00\00\00\ff\ff\ff\ff\01")
 (data $19.2 (i32.const 3204) "\01\00\00\00\ff\ff\ff\ff")
 (data $20 (i32.const 3228) ",")
 (data $20.1 (i32.const 3240) "\06\00\00\00\10\00\00\00\01\00\00\00\ff\ff\ff\ff")
 (data $21 (i32.const 3276) ",")
 (data $21.1 (i32.const 3288) "\06\00\00\00\10")
 (data $21.2 (i32.const 3304) "\01\00\00\00\ff\ff\ff\ff")
 (data $22 (i32.const 3324) "<")
 (data $22.1 (i32.const 3336) "\02\00\00\00*\00\00\00O\00b\00j\00e\00c\00t\00 \00a\00l\00r\00e\00a\00d\00y\00 \00p\00i\00n\00n\00e\00d")
 (data $23 (i32.const 3388) "<")
 (data $23.1 (i32.const 3400) "\02\00\00\00(\00\00\00O\00b\00j\00e\00c\00t\00 \00i\00s\00 \00n\00o\00t\00 \00p\00i\00n\00n\00e\00d")
 (data $24 (i32.const 3456) "\t\00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00d\00\00\00d\08\00\00$\t\00\00$\1a\00\00\02\t")
 (export "initSimulation" (func $assembly/index/initSimulation))
 (export "tick" (func $assembly/index/tick))
 (export "testBfsPath" (func $assembly/index/testBfsPath))
 (export "testBfsNextStep" (func $assembly/index/testBfsNextStep))
 (export "testRandomWalkStepLevel" (func $assembly/index/testRandomWalkStepLevel))
 (export "testRandomRoamStepLevel" (func $assembly/index/testRandomRoamStepLevel))
 (export "getRngStateForTest" (func $assembly/index/getRngStateForTest))
 (export "setRngStateForTest" (func $assembly/index/setRngStateForTest))
 (export "getRngState" (func $assembly/index/getRngStateForTest))
 (export "setRngState" (func $assembly/index/setRngStateForTest))
 (export "nextRandForTest" (func $assembly/index/nextRandForTest))
 (export "testFindAdjacentPath" (func $assembly/index/testFindAdjacentPath))
 (export "testCalcRepairTicks" (func $assembly/index/testCalcRepairTicks))
 (export "testHasSecurityNearby" (func $assembly/index/testHasSecurityNearby))
 (export "tileAt" (func $assembly/sim/grid/gridOps/tileAt))
 (export "getTileHeight" (func $assembly/sim/grid/gridOps/getTileHeight))
 (export "getTileSlopeMask" (func $assembly/sim/grid/gridOps/getTileSlopeMask))
 (export "getUpperPathVariant" (func $assembly/sim/grid/gridOps/getUpperPathVariant))
 (export "getUpperPathHeight" (func $assembly/sim/grid/gridOps/getUpperPathHeight))
 (export "getRampDirection" (func $assembly/sim/grid/gridOps/getRampDirection))
 (export "getUpperRampDirection" (func $assembly/sim/grid/gridOps/getUpperRampDirection))
 (export "getBaseHeight" (func $assembly/sim/grid/gridOps/getBaseHeight))
 (export "getMaxHeight" (func $assembly/sim/grid/gridOps/getMaxHeight))
 (export "getLevelsUp" (func $assembly/sim/grid/gridOps/getLevelsUp))
 (export "getLevelsDown" (func $assembly/sim/grid/gridOps/getLevelsDown))
 (export "configureTerrain" (func $assembly/sim/grid/gridOps/configureTerrain))
 (export "clearGrid" (func $assembly/sim/grid/gridOps/clearGrid))
 (export "canPlace" (func $assembly/sim/grid/gridOps/canPlace))
 (export "generateTerrain" (func $assembly/sim/terrain/terrainGen/generateTerrain))
 (export "configureAttraction" (func $assembly/sim/attractions/attractions/configureAttraction))
 (export "getTemplateCount" (func $assembly/sim/attractions/attractions/getTemplateCount))
 (export "getTmplFootprintW" (func $assembly/sim/attractions/attractions/getTmplFootprintW))
 (export "getTmplFootprintH" (func $assembly/sim/attractions/attractions/getTmplFootprintH))
 (export "getTmplBuildPrice" (func $assembly/sim/attractions/attractions/getTmplBuildPrice))
 (export "getTmplTicketPrice" (func $assembly/sim/attractions/attractions/getTmplTicketPrice))
 (export "getTmplCapacity" (func $assembly/sim/attractions/attractions/getTmplCapacity))
 (export "getTmplCategory" (func $assembly/sim/attractions/attractions/getTmplCategory))
 (export "getTmplAppeal" (func $assembly/sim/attractions/attractions/getTmplAppeal))
 (export "getInstanceCount" (func $assembly/sim/attractions/attractions/getInstanceCount))
 (export "getInstTemplateId" (func $assembly/sim/attractions/attractions/getInstTemplateId))
 (export "getInstX" (func $assembly/sim/attractions/attractions/getInstX))
 (export "getInstY" (func $assembly/sim/attractions/attractions/getInstY))
 (export "getInstRotation" (func $assembly/sim/attractions/attractions/getInstRotation))
 (export "isInstActive" (func $assembly/sim/attractions/attractions/isInstActive))
 (export "getInstTicketPrice" (func $assembly/sim/attractions/attractions/getInstTicketPrice))
 (export "getInstRiders" (func $assembly/sim/attractions/attractions/getInstRiders))
 (export "getInstEntranceX" (func $assembly/sim/attractions/attractions/getInstEntranceX))
 (export "getInstEntranceY" (func $assembly/sim/attractions/attractions/getInstEntranceY))
 (export "getInstExitX" (func $assembly/sim/attractions/attractions/getInstExitX))
 (export "getInstExitY" (func $assembly/sim/attractions/attractions/getInstExitY))
 (export "getInstQueueLength" (func $assembly/sim/attractions/attractions/getInstQueueLength))
 (export "getInstWaitTicks" (func $assembly/sim/attractions/attractions/getInstWaitTicks))
 (export "getInstPopularity" (func $assembly/sim/attractions/attractions/getInstPopularity))
 (export "getInstCapacity" (func $assembly/sim/attractions/attractions/getInstCapacity))
 (export "getInstCategory" (func $assembly/sim/attractions/attractions/getInstCategory))
 (export "getInstAppeal" (func $assembly/sim/attractions/attractions/getInstAppeal))
 (export "getInstEffectiveAppeal" (func $assembly/sim/attractions/attractions/getInstEffectiveAppeal))
 (export "getInstAgeMonths" (func $assembly/sim/attractions/attractions/getInstAgeMonths))
 (export "getInstBroken" (func $assembly/sim/attractions/attractions/getInstBroken))
 (export "getInstRepairTicks" (func $assembly/sim/attractions/attractions/getInstRepairTicks))
 (export "getInstTotalVisitors" (func $assembly/sim/attractions/attractions/getInstTotalVisitors))
 (export "getInstTotalRevenue" (func $assembly/sim/attractions/attractions/getInstTotalRevenue))
 (export "getInstMonthlyRevenue" (func $assembly/sim/attractions/attractions/getInstMonthlyRevenue))
 (export "setInstTicketPrice" (func $assembly/sim/attractions/attractions/setInstTicketPrice))
 (export "setInstCapacity" (func $assembly/sim/attractions/attractions/setInstCapacity))
 (export "setInstEndpoints" (func $assembly/sim/attractions/attractions/setInstEndpoints))
 (export "instanceAtTile" (func $assembly/sim/attractions/attractions/instanceAtTile))
 (export "getBrokenAttractionCount" (func $assembly/sim/attractions/attractions/getBrokenAttractionCount))
 (export "getPlacedAttractionCount" (func $assembly/sim/attractions/attractions/getPlacedAttractionCount))
 (export "placeAttraction" (func $assembly/sim/attractions/attractions/placeAttraction))
 (export "placeAttractionRotated" (func $assembly/sim/attractions/attractions/placeAttractionRotated))
 (export "placeAttractionWithEndpoints" (func $assembly/sim/attractions/attractions/placeAttractionWithEndpoints))
 (export "placeAttractionWithEndpointsRotated" (func $assembly/sim/attractions/attractions/placeAttractionWithEndpointsRotated))
 (export "demolish" (func $assembly/sim/attractions/attractions/demolish))
 (export "getAttractionCount" (func $assembly/sim/attractions/attractions/getTemplateCount))
 (export "getMechanicCount" (func $assembly/sim/employees/employees/getMechanicCount))
 (export "getCleanerCount" (func $assembly/sim/employees/employees/getCleanerCount))
 (export "getSecurityCount" (func $assembly/sim/employees/employees/getSecurityCount))
 (export "getEntertainerCount" (func $assembly/sim/employees/employees/getEntertainerCount))
 (export "getMechanicX" (func $assembly/sim/employees/employees/getMechanicX))
 (export "getMechanicY" (func $assembly/sim/employees/employees/getMechanicY))
 (export "getMechanicTarget" (func $assembly/sim/employees/employees/getMechanicTarget))
 (export "getMechanicRepairTimer" (func $assembly/sim/employees/employees/getMechanicRepairTimer))
 (export "getMechanicUid" (func $assembly/sim/employees/employees/getMechanicUid))
 (export "getMechanicHiredTick" (func $assembly/sim/employees/employees/getMechanicHiredTick))
 (export "getMechanicRepairsCompleted" (func $assembly/sim/employees/employees/getMechanicRepairsCompleted))
 (export "getMechanicAreaCount" (func $assembly/sim/employees/employees/getMechanicAreaCount))
 (export "getMechanicAreaX" (func $assembly/sim/employees/employees/getMechanicAreaX))
 (export "getMechanicAreaY" (func $assembly/sim/employees/employees/getMechanicAreaY))
 (export "getCleanerX" (func $assembly/sim/employees/employees/getCleanerX))
 (export "getCleanerY" (func $assembly/sim/employees/employees/getCleanerY))
 (export "getCleanerTargetX" (func $assembly/sim/employees/employees/getCleanerTargetX))
 (export "getCleanerTargetY" (func $assembly/sim/employees/employees/getCleanerTargetY))
 (export "getCleanerCleanTimer" (func $assembly/sim/employees/employees/getCleanerCleanTimer))
 (export "getCleanerUid" (func $assembly/sim/employees/employees/getCleanerUid))
 (export "getCleanerHiredTick" (func $assembly/sim/employees/employees/getCleanerHiredTick))
 (export "getCleanerPathsCleaned" (func $assembly/sim/employees/employees/getCleanerPathsCleaned))
 (export "getCleanerAreaCount" (func $assembly/sim/employees/employees/getCleanerAreaCount))
 (export "getCleanerAreaX" (func $assembly/sim/employees/employees/getCleanerAreaX))
 (export "getCleanerAreaY" (func $assembly/sim/employees/employees/getCleanerAreaY))
 (export "getSecurityX" (func $assembly/sim/employees/employees/getSecurityX))
 (export "getSecurityY" (func $assembly/sim/employees/employees/getSecurityY))
 (export "getSecurityTargetVisitor" (func $assembly/sim/employees/employees/getSecurityTargetVisitor))
 (export "getSecurityUid" (func $assembly/sim/employees/employees/getSecurityUid))
 (export "getSecurityHiredTick" (func $assembly/sim/employees/employees/getSecurityHiredTick))
 (export "getSecurityIncidentsHandled" (func $assembly/sim/employees/employees/getSecurityIncidentsHandled))
 (export "getSecurityAreaCount" (func $assembly/sim/employees/employees/getSecurityAreaCount))
 (export "getSecurityAreaX" (func $assembly/sim/employees/employees/getSecurityAreaX))
 (export "getSecurityAreaY" (func $assembly/sim/employees/employees/getSecurityAreaY))
 (export "getEntertainerX" (func $assembly/sim/employees/employees/getEntertainerX))
 (export "getEntertainerY" (func $assembly/sim/employees/employees/getEntertainerY))
 (export "getEntertainerUid" (func $assembly/sim/employees/employees/getEntertainerUid))
 (export "getEntertainerHiredTick" (func $assembly/sim/employees/employees/getEntertainerHiredTick))
 (export "getEntertainerGuestsCheered" (func $assembly/sim/employees/employees/getEntertainerGuestsCheered))
 (export "getEntertainerAreaCount" (func $assembly/sim/employees/employees/getEntertainerAreaCount))
 (export "getEntertainerAreaX" (func $assembly/sim/employees/employees/getEntertainerAreaX))
 (export "getEntertainerAreaY" (func $assembly/sim/employees/employees/getEntertainerAreaY))
 (export "getBudget" (func $assembly/sim/employees/employees/getBudget))
 (export "setBudget" (func $assembly/sim/employees/employees/setBudget))
 (export "getEntranceTicket" (func $assembly/sim/employees/employees/getEntranceTicket))
 (export "setEntranceTicket" (func $assembly/sim/employees/employees/setEntranceTicket))
 (export "getTotalIncome" (func $assembly/sim/employees/employees/getTotalIncome))
 (export "getTotalExpense" (func $assembly/sim/employees/employees/getTotalExpense))
 (export "getParkAttractiveness" (func $assembly/sim/employees/employees/getParkAttractiveness))
 (export "getCriminalRate" (func $assembly/sim/employees/employees/getCriminalRate))
 (export "setCriminalRate" (func $assembly/sim/employees/employees/setCriminalRate))
 (export "getTheftCount" (func $assembly/sim/employees/employees/getTheftCount))
 (export "getVandalismCount" (func $assembly/sim/employees/employees/getVandalismCount))
 (export "hireMechanic" (func $assembly/sim/employees/employees/hireMechanic))
 (export "hireCleaner" (func $assembly/sim/employees/employees/hireCleaner))
 (export "hireSecurity" (func $assembly/sim/employees/employees/hireSecurity))
 (export "hireEntertainer" (func $assembly/sim/employees/employees/hireEntertainer))
 (export "fireMechanic" (func $assembly/sim/employees/employees/fireMechanic))
 (export "fireCleaner" (func $assembly/sim/employees/employees/fireCleaner))
 (export "fireSecurity" (func $assembly/sim/employees/employees/fireSecurity))
 (export "fireEntertainer" (func $assembly/sim/employees/employees/fireEntertainer))
 (export "setMechanicArea" (func $assembly/sim/employees/employees/setMechanicArea))
 (export "clearMechanicAreas" (func $assembly/sim/employees/employees/clearMechanicAreas))
 (export "setCleanerArea" (func $assembly/sim/employees/employees/setCleanerArea))
 (export "clearCleanerAreas" (func $assembly/sim/employees/employees/clearCleanerAreas))
 (export "setSecurityArea" (func $assembly/sim/employees/employees/setSecurityArea))
 (export "clearSecurityAreas" (func $assembly/sim/employees/employees/clearSecurityAreas))
 (export "setEntertainerArea" (func $assembly/sim/employees/employees/setEntertainerArea))
 (export "clearEntertainerAreas" (func $assembly/sim/employees/employees/clearEntertainerAreas))
 (export "relocateMechanic" (func $assembly/sim/employees/employees/relocateMechanic))
 (export "relocateCleaner" (func $assembly/sim/employees/employees/relocateCleaner))
 (export "relocateSecurity" (func $assembly/sim/employees/employees/relocateSecurity))
 (export "relocateEntertainer" (func $assembly/sim/employees/employees/relocateEntertainer))
 (export "drownMechanic" (func $assembly/sim/employees/employees/drownMechanic))
 (export "drownCleaner" (func $assembly/sim/employees/employees/drownCleaner))
 (export "drownSecurity" (func $assembly/sim/employees/employees/drownSecurity))
 (export "drownEntertainer" (func $assembly/sim/employees/employees/drownEntertainer))
 (export "applyDrowningPenalty" (func $assembly/sim/employees/employees/applyDrowningPenalty))
 (export "getActiveVisitors" (func $assembly/sim/visitors/visitors/getActiveVisitors))
 (export "getTickCount" (func $assembly/sim/visitors/visitors/getTickCount))
 (export "getVisitorX" (func $assembly/sim/visitors/visitors/getVisitorX))
 (export "getVisitorY" (func $assembly/sim/visitors/visitors/getVisitorY))
 (export "getVisitorState" (func $assembly/sim/visitors/visitors/getVisitorState))
 (export "getVisitorSatisfaction" (func $assembly/sim/visitors/visitors/getVisitorSatisfaction))
 (export "getVisitorTarget" (func $assembly/sim/visitors/visitors/getVisitorTarget))
 (export "getVisitorStuckTimer" (func $assembly/sim/visitors/visitors/getVisitorStuckTimer))
 (export "getVisitorWallet" (func $assembly/sim/visitors/visitors/getVisitorWallet))
 (export "getVisitorPathLevel" (func $assembly/sim/visitors/visitors/getVisitorPathLevel))
 (export "getVisitorHunger" (func $assembly/sim/visitors/visitors/getVisitorHunger))
 (export "getVisitorThirst" (func $assembly/sim/visitors/visitors/getVisitorThirst))
 (export "getVisitorBladder" (func $assembly/sim/visitors/visitors/getVisitorBladder))
 (export "getVisitorFun" (func $assembly/sim/visitors/visitors/getVisitorFun))
 (export "getVisitorNausea" (func $assembly/sim/visitors/visitors/getVisitorNausea))
 (export "getVisitorPukeTimer" (func $assembly/sim/visitors/visitors/getVisitorPukeTimer))
 (export "getVisitorExcitement" (func $assembly/sim/visitors/visitors/getVisitorExcitement))
 (export "getVisitorExcitementTolerance" (func $assembly/sim/visitors/visitors/getVisitorExcitementTolerance))
 (export "getVisitorIsCriminal" (func $assembly/sim/visitors/visitors/getVisitorIsCriminal))
 (export "getVisitorBalloonTimer" (func $assembly/sim/visitors/visitors/getVisitorBalloonTimer))
 (export "getVisitorUmbrellaTimer" (func $assembly/sim/visitors/visitors/getVisitorUmbrellaTimer))
 (export "setIsRaining" (func $assembly/sim/visitors/visitors/setIsRaining))
 (export "getIsRaining" (func $assembly/sim/visitors/visitors/getIsRaining))
 (export "getPukeAt" (func $assembly/sim/visitors/visitors/getPukeAt))
 (export "getDirtyPathCount" (func $assembly/sim/visitors/visitors/getDirtyPathCount))
 (export "getAvgSatisfaction" (func $assembly/sim/visitors/visitors/getAvgSatisfaction))
 (export "getAvgHunger" (func $assembly/sim/visitors/visitors/getAvgHunger))
 (export "getAvgThirst" (func $assembly/sim/visitors/visitors/getAvgThirst))
 (export "getAvgBladder" (func $assembly/sim/visitors/visitors/getAvgBladder))
 (export "applyCrimeShock" (func $assembly/sim/visitors/visitors/applyCrimeShock))
 (export "reportVandalism" (func $assembly/sim/visitors/visitors/reportVandalism))
 (export "triggerCriminalEscape" (func $assembly/sim/visitors/visitors/triggerCriminalEscape))
 (export "relocateVisitor" (func $assembly/sim/visitors/visitors/relocateVisitor))
 (export "drownVisitor" (func $assembly/sim/visitors/visitors/drownVisitor))
 (export "adjustTerrain" (func $assembly/sim/placement/placement/adjustTerrain))
 (export "adjustTerrainCorners" (func $assembly/sim/placement/placement/adjustTerrainCorners))
 (export "adjustTerrainZone" (func $assembly/sim/placement/placement/adjustTerrainZone))
 (export "placePath" (func $assembly/sim/placement/placement/placePath))
 (export "placePathVariant" (func $assembly/sim/placement/placement/placePathVariant))
 (export "placeElevatedPath" (func $assembly/sim/placement/placement/placeElevatedPath))
 (export "placeLandVariant" (func $assembly/sim/placement/placement/placeLandVariant))
 (export "placeTree" (func $assembly/sim/placement/placement/placeTree))
 (export "placeTreeVariant" (func $assembly/sim/placement/placement/placeTreeVariant))
 (export "placeWater" (func $assembly/sim/placement/placement/placeWater))
 (export "placePathAtHeight" (func $assembly/sim/placement/placement/placePathAtHeight))
 (export "removePathAtHeight" (func $assembly/sim/placement/placement/removePathAtHeight))
 (export "getPathAtHeight" (func $assembly/sim/placement/placement/getPathAtHeight))
 (export "getPathLevelRampDir" (func $assembly/sim/placement/placement/getPathLevelRampDir))
 (export "getPathLevelCount" (func $assembly/sim/placement/placement/getPathLevelCount))
 (export "isBridge" (func $assembly/sim/placement/placement/isBridge))
 (export "isTunnel" (func $assembly/sim/placement/placement/isTunnel))
 (export "__new" (func $~lib/rt/itcms/__new))
 (export "__pin" (func $~lib/rt/itcms/__pin))
 (export "__unpin" (func $~lib/rt/itcms/__unpin))
 (export "__collect" (func $~lib/rt/itcms/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (start $~start)
 (func $~lib/rt/itcms/initLazy (param $0 i32) (result i32)
  local.get $0
  local.get $0
  i32.store offset=4
  local.get $0
  local.get $0
  i32.store offset=8
  local.get $0
 )
 (func $~lib/rt/itcms/visitRoots
  (local $0 i32)
  (local $1 i32)
  call $~lib/rt/__visit_globals
  global.get $~lib/rt/itcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 1232
     i32.const 160
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/itcms/Object#set:color (param $0 i32) (param $1 i32)
  local.get $0
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.get $1
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#set:next (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#unlink (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.tee $1
  i32.eqz
  if
   local.get $0
   i32.load offset=8
   i32.eqz
   local.get $0
   i32.const 36264
   i32.lt_u
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1232
    i32.const 128
    i32.const 18
    call $~lib/builtins/abort
    unreachable
   end
   return
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  i32.eqz
  if
   i32.const 0
   i32.const 1232
   i32.const 132
   i32.const 16
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $1
  call $~lib/rt/itcms/Object#set:next
 )
 (func $~lib/rt/itcms/Object#linkTo (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.load offset=8
  local.set $3
  local.get $0
  local.get $1
  local.get $2
  i32.or
  i32.store offset=4
  local.get $0
  local.get $3
  i32.store offset=8
  local.get $3
  local.get $0
  call $~lib/rt/itcms/Object#set:next
  local.get $1
  local.get $0
  i32.store offset=8
 )
 (func $~lib/rt/itcms/Object#makeGray (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  global.get $~lib/rt/itcms/iter
  i32.eq
  if
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1232
    i32.const 148
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   global.set $~lib/rt/itcms/iter
  end
  local.get $0
  call $~lib/rt/itcms/Object#unlink
  global.get $~lib/rt/itcms/toSpace
  local.set $1
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 2
  i32.le_u
  if (result i32)
   i32.const 1
  else
   local.get $2
   i32.const 3456
   i32.load
   i32.gt_u
   if
    i32.const 1360
    i32.const 1424
    i32.const 21
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   i32.const 2
   i32.shl
   i32.const 3460
   i32.add
   i32.load
   i32.const 32
   i32.and
  end
  local.set $2
  local.get $0
  local.get $1
  global.get $~lib/rt/itcms/white
  i32.eqz
  i32.const 2
  local.get $2
  select
  call $~lib/rt/itcms/Object#linkTo
 )
 (func $~lib/rt/itcms/__visit (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  global.get $~lib/rt/itcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
   global.get $~lib/rt/itcms/visitCount
   i32.const 1
   i32.add
   global.set $~lib/rt/itcms/visitCount
  end
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.tee $3
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $3
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $3
   local.get $3
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $2
   local.get $3
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $3
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   i32.store offset=8
  end
  local.get $5
  if
   local.get $5
   local.get $4
   i32.store offset=4
  end
  local.get $1
  local.get $0
  local.get $2
  i32.const 4
  i32.shl
  local.get $3
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.tee $1
  i32.load offset=96
  i32.eq
  if
   local.get $1
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $3
    i32.rotl
    i32.and
    local.set $3
    local.get $1
    local.get $3
    i32.store offset=4
    local.get $3
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $2
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1504
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $1
  i32.const 4
  i32.add
  local.get $2
  i32.add
  i32.ne
  if
   i32.const 0
   i32.const 1504
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $2
   local.get $2
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  local.get $3
  if
   local.get $3
   local.get $1
   i32.store offset=4
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $0
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $2
  local.get $1
  i64.extend_i32_u
  i64.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 382
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $3
  if
   local.get $3
   i32.const 4
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1504
    i32.const 389
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $3
   local.get $1
   i32.const 16
   i32.sub
   local.tee $5
   i32.eq
   if
    local.get $3
    i32.load
    local.set $4
    local.get $5
    local.set $1
   end
  else
   local.get $0
   i32.const 1572
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1504
    i32.const 402
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.wrap_i64
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $4
  i32.const 2
  i32.and
  local.get $3
  i32.const 8
  i32.sub
  local.tee $3
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 4
  i32.add
  local.get $3
  i32.add
  local.tee $3
  i32.const 2
  i32.store
  local.get $0
  local.get $3
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 36272
  i32.const 0
  i32.store
  i32.const 37840
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 36272
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $0
      i32.const 4
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      i32.const 36272
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 36272
  i32.const 37844
  memory.size
  i64.extend_i32_s
  i64.const 16
  i64.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 36272
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/itcms/step (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $break|0
   block $case2|0
    block $case1|0
     block $case0|0
      global.get $~lib/rt/itcms/state
      br_table $case0|0 $case1|0 $case2|0 $break|0
     end
     i32.const 1
     global.set $~lib/rt/itcms/state
     i32.const 0
     global.set $~lib/rt/itcms/visitCount
     call $~lib/rt/itcms/visitRoots
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/iter
     global.get $~lib/rt/itcms/visitCount
     return
    end
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.set $1
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    loop $while-continue|1
     local.get $0
     global.get $~lib/rt/itcms/toSpace
     i32.ne
     if
      local.get $0
      global.set $~lib/rt/itcms/iter
      local.get $1
      local.get $0
      i32.load offset=4
      i32.const 3
      i32.and
      i32.ne
      if
       local.get $0
       local.get $1
       call $~lib/rt/itcms/Object#set:color
       i32.const 0
       global.set $~lib/rt/itcms/visitCount
       local.get $0
       i32.const 20
       i32.add
       call $~lib/rt/__visit_members
       global.get $~lib/rt/itcms/visitCount
       return
      end
      local.get $0
      i32.load offset=4
      i32.const -4
      i32.and
      local.set $0
      br $while-continue|1
     end
    end
    i32.const 0
    global.set $~lib/rt/itcms/visitCount
    call $~lib/rt/itcms/visitRoots
    global.get $~lib/rt/itcms/toSpace
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.set $0
     loop $while-continue|0
      local.get $0
      i32.const 36264
      i32.lt_u
      if
       local.get $0
       i32.load
       call $~lib/rt/itcms/__visit
       local.get $0
       i32.const 4
       i32.add
       local.set $0
       br $while-continue|0
      end
     end
     global.get $~lib/rt/itcms/iter
     i32.load offset=4
     i32.const -4
     i32.and
     local.set $0
     loop $while-continue|2
      local.get $0
      global.get $~lib/rt/itcms/toSpace
      i32.ne
      if
       local.get $1
       local.get $0
       i32.load offset=4
       i32.const 3
       i32.and
       i32.ne
       if
        local.get $0
        local.get $1
        call $~lib/rt/itcms/Object#set:color
        local.get $0
        i32.const 20
        i32.add
        call $~lib/rt/__visit_members
       end
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       local.set $0
       br $while-continue|2
      end
     end
     global.get $~lib/rt/itcms/fromSpace
     local.set $0
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/fromSpace
     local.get $0
     global.set $~lib/rt/itcms/toSpace
     local.get $1
     global.set $~lib/rt/itcms/white
     local.get $0
     i32.load offset=4
     i32.const -4
     i32.and
     global.set $~lib/rt/itcms/iter
     i32.const 2
     global.set $~lib/rt/itcms/state
    end
    global.get $~lib/rt/itcms/visitCount
    return
   end
   global.get $~lib/rt/itcms/iter
   local.tee $0
   global.get $~lib/rt/itcms/toSpace
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    global.set $~lib/rt/itcms/iter
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1232
     i32.const 229
     i32.const 20
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 36264
    i32.lt_u
    if
     local.get $0
     i32.const 0
     i32.store offset=4
     local.get $0
     i32.const 0
     i32.store offset=8
    else
     global.get $~lib/rt/itcms/total
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/itcms/total
     local.get $0
     i32.const 4
     i32.add
     local.tee $1
     i32.const 36264
     i32.ge_u
     if
      global.get $~lib/rt/tlsf/ROOT
      i32.eqz
      if
       call $~lib/rt/tlsf/initialize
      end
      global.get $~lib/rt/tlsf/ROOT
      local.set $2
      local.get $1
      i32.const 4
      i32.sub
      local.set $0
      local.get $1
      i32.const 15
      i32.and
      i32.const 1
      local.get $1
      select
      if (result i32)
       i32.const 1
      else
       local.get $0
       i32.load
       i32.const 1
       i32.and
      end
      if
       i32.const 0
       i32.const 1504
       i32.const 562
       i32.const 3
       call $~lib/builtins/abort
       unreachable
      end
      local.get $0
      local.get $0
      i32.load
      i32.const 1
      i32.or
      i32.store
      local.get $2
      local.get $0
      call $~lib/rt/tlsf/insertBlock
     end
    end
    i32.const 10
    return
   end
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   i32.store offset=4
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   i32.store offset=8
   i32.const 0
   global.set $~lib/rt/itcms/state
  end
  i32.const 0
 )
 (func $~lib/rt/tlsf/roundSize (param $0 i32) (result i32)
  local.get $0
  i32.const 536870910
  i32.lt_u
  if (result i32)
   local.get $0
   i32.const 1
   i32.const 27
   local.get $0
   i32.clz
   i32.sub
   i32.shl
   i32.add
   i32.const 1
   i32.sub
  else
   local.get $0
  end
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $1
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $1
   call $~lib/rt/tlsf/roundSize
   local.tee $1
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $2
   local.get $1
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 334
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 1504
     i32.const 347
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1168
   i32.const 1504
   i32.const 461
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 12
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.get $1
  i32.const 12
  i32.le_u
  select
  local.tee $1
  call $~lib/rt/tlsf/searchBlock
  local.tee $2
  i32.eqz
  if
   local.get $1
   i32.const 256
   i32.ge_u
   if (result i32)
    local.get $1
    call $~lib/rt/tlsf/roundSize
   else
    local.get $1
   end
   local.set $2
   memory.size
   local.tee $3
   local.get $2
   i32.const 4
   local.get $0
   i32.load offset=1568
   local.get $3
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $2
   local.get $2
   local.get $3
   i32.lt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $2
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $0
   local.get $3
   i32.const 16
   i32.shl
   memory.size
   i64.extend_i32_s
   i64.const 16
   i64.shl
   call $~lib/rt/tlsf/addMemory
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/searchBlock
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 1504
    i32.const 499
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $1
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.gt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 501
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  call $~lib/rt/tlsf/removeBlock
  local.get $2
  i32.load
  local.set $4
  local.get $1
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 1504
   i32.const 361
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const -4
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 16
  i32.ge_u
  if
   local.get $2
   local.get $1
   local.get $4
   i32.const 2
   i32.and
   i32.or
   i32.store
   local.get $2
   i32.const 4
   i32.add
   local.get $1
   i32.add
   local.tee $1
   local.get $3
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $2
   local.get $4
   i32.const -2
   i32.and
   i32.store
   local.get $2
   i32.const 4
   i32.add
   local.get $2
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $0
   local.get $0
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
  local.get $2
 )
 (func $~lib/rt/itcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.const 1073741804
  i32.ge_u
  if
   i32.const 1168
   i32.const 1232
   i32.const 261
   i32.const 31
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/total
  global.get $~lib/rt/itcms/threshold
  i32.ge_u
  if
   block $__inlined_func$~lib/rt/itcms/interrupt$67
    i32.const 2048
    local.set $2
    loop $do-loop|0
     local.get $2
     call $~lib/rt/itcms/step
     i32.sub
     local.set $2
     global.get $~lib/rt/itcms/state
     i32.eqz
     if
      global.get $~lib/rt/itcms/total
      i64.extend_i32_u
      i64.const 200
      i64.mul
      i64.const 100
      i64.div_u
      i32.wrap_i64
      i32.const 1024
      i32.add
      global.set $~lib/rt/itcms/threshold
      br $__inlined_func$~lib/rt/itcms/interrupt$67
     end
     local.get $2
     i32.const 0
     i32.gt_s
     br_if $do-loop|0
    end
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/threshold
    i32.sub
    i32.const 1024
    i32.lt_u
    i32.const 10
    i32.shl
    i32.add
    global.set $~lib/rt/itcms/threshold
   end
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/tlsf/allocateBlock
  local.tee $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  local.get $2
  global.get $~lib/rt/itcms/fromSpace
  global.get $~lib/rt/itcms/white
  call $~lib/rt/itcms/Object#linkTo
  global.get $~lib/rt/itcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/itcms/total
  local.get $2
  i32.const 20
  i32.add
  local.tee $1
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
 )
 (func $start:assembly/sim/state/employeeState
  i32.const 8
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/employeeState/mechActive
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechTarget
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechRepairTimer
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechUid
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechHiredTick
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechRepairsCompleted
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechPatrolX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechPatrolY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechAreaCount
  i32.const 32
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechAreaX
  i32.const 32
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/mechAreaY
  i32.const 8
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/employeeState/cleanerActive
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerTargetX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerTargetY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerCleanTimer
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerUid
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerHiredTick
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerPathsCleaned
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerPatrolX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerPatrolY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerAreaCount
  i32.const 32
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerAreaX
  i32.const 32
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/cleanerAreaY
  i32.const 8
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/employeeState/securityActive
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityTargetVisitor
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityPatrolX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityPatrolY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityUid
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityHiredTick
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityIncidentsHandled
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityAreaCount
  i32.const 32
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityAreaX
  i32.const 32
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/securityAreaY
  i32.const 8
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/employeeState/entertainerActive
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerPatrolX
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerPatrolY
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerUid
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerHiredTick
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerGuestsCheered
  i32.const 8
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerAreaCount
  i32.const 32
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerAreaX
  i32.const 32
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/employeeState/entertainerAreaY
 )
 (func $start:assembly/sim/state/attractionState
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplFootprintW
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplFootprintH
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplBuildPrice
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplTicketPrice
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplCapacity
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplCategory
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplAppeal
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplRideTicks
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplMonthlyCost
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplRequiredExcitement
  i32.const 20
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/tmplNauseaGain
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instTemplateId
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instX
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instY
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instRotation
  i32.const 128
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/attractionState/instActive
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instTicketPrice
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instCapacity
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instCurrentRiders
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instEntranceX
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instEntranceY
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instExitX
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instExitY
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instBuildTick
  i32.const 128
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/attractionState/instBroken
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instRepairTicks
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instTotalVisitors
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instTotalRevenue
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instMonthlyRevenue
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instQueueLength
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instEstimatedWaitTicks
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/attractionState/instPopularity
 )
 (func $start:assembly/index
  memory.size
  i32.const 16
  i32.shl
  i32.const 36264
  i32.sub
  i32.const 1
  i32.shr_u
  global.set $~lib/rt/itcms/threshold
  i32.const 1280
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/pinSpace
  i32.const 1312
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/toSpace
  i32.const 1456
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/fromSpace
  i32.const 2500
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/gridState/gridData
  i32.const 2500
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/gridState/heightData
  i32.const 2500
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/gridState/cornerMaskData
  i32.const 2500
  call $~lib/staticarray/StaticArray<i8>#constructor
  global.set $assembly/sim/state/gridState/upperPathVariantData
  i32.const 2500
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/gridState/upperPathHeightData
  i32.const 2500
  call $~lib/staticarray/StaticArray<i8>#constructor
  global.set $assembly/sim/state/gridState/rampDirData
  i32.const 2500
  call $~lib/staticarray/StaticArray<i8>#constructor
  global.set $assembly/sim/state/gridState/upperRampDirData
  i32.const 22500
  call $~lib/staticarray/StaticArray<i8>#constructor
  global.set $assembly/sim/state/gridState/pathLevelData
  i32.const 22500
  call $~lib/staticarray/StaticArray<i8>#constructor
  global.set $assembly/sim/state/gridState/pathLevelRampData
  global.get $assembly/sim/state/gridState/TERRAIN_LEVELS_DOWN
  global.set $assembly/sim/state/gridState/TERRAIN_BASE_HEIGHT
  global.get $assembly/sim/state/gridState/TERRAIN_LEVELS_DOWN
  global.get $assembly/sim/state/gridState/TERRAIN_LEVELS_UP
  i32.add
  global.set $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
  global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
  i32.const 1
  i32.sub
  global.set $assembly/sim/state/gridState/TERRAIN_MAX_BUILD_HEIGHT
  call $start:assembly/sim/state/employeeState
  i32.const 2500
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/parkState/pukeData
  call $start:assembly/sim/state/attractionState
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vX
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vY
  i32.const 100
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/visitorState/vState
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vTarget
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vTimer
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vSatisfaction
  i32.const 600
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vNeeds
  i32.const 100
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/visitorState/vPaid
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vStuckTimer
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vWallet
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vQueueX
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vQueueY
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vQueueOrder
  i32.const 100
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/visitorState/vLevel
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vExcitement
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vExcitementTolerance
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vNausea
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vPukeTimer
  i32.const 100
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/visitorState/vCriminal
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vCrimeTimer
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vCrimeCooldown
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vCrowdComplaintCooldown
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vBalloonTimer
  i32.const 100
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/visitorState/vUmbrellaTimer
  i32.const 512
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/noise/perm
  i32.const 512
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/noise/permMod12
  f64.const 0.3660254037844386
  global.set $assembly/sim/noise/F2
  f64.const 0.21132486540518713
  global.set $assembly/sim/noise/G2
  i32.const 67500
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/pathfindingState/bfsQueue
  i32.const 22500
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $assembly/sim/state/pathfindingState/bfsVisited
  i32.const 22500
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/pathfindingState/bfsDist
  i32.const 22500
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $assembly/sim/state/pathfindingState/bfsParent
 )
 (func $~lib/staticarray/StaticArray<i32>#__uset (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
 )
 (func $assembly/sim/behavior/rng/nextRand (result i32)
  global.get $assembly/sim/state/visitorState/rngState
  global.get $assembly/sim/state/visitorState/rngState
  i32.const 13
  i32.shl
  i32.xor
  global.set $assembly/sim/state/visitorState/rngState
  global.get $assembly/sim/state/visitorState/rngState
  global.get $assembly/sim/state/visitorState/rngState
  i32.const 17
  i32.shr_s
  i32.xor
  global.set $assembly/sim/state/visitorState/rngState
  global.get $assembly/sim/state/visitorState/rngState
  global.get $assembly/sim/state/visitorState/rngState
  i32.const 5
  i32.shl
  i32.xor
  global.set $assembly/sim/state/visitorState/rngState
  i32.const 0
  global.get $assembly/sim/state/visitorState/rngState
  i32.sub
  global.get $assembly/sim/state/visitorState/rngState
  global.get $assembly/sim/state/visitorState/rngState
  i32.const 0
  i32.lt_s
  select
 )
 (func $assembly/sim/terrain/terrainGen/placeSparseTrees (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.const 25
  i32.mul
  local.set $6
  loop $while-continue|0
   local.get $4
   local.get $6
   i32.lt_s
   local.get $0
   local.get $5
   i32.gt_s
   i32.and
   if
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    call $assembly/sim/behavior/rng/nextRand
    i32.const 50
    i32.rem_s
    local.tee $1
    call $assembly/sim/behavior/rng/nextRand
    i32.const 50
    i32.rem_s
    local.tee $2
    call $assembly/sim/terrain/terrainGen/canPlaceNaturalTile
    i32.eqz
    br_if $while-continue|0
    local.get $1
    local.get $2
    call $assembly/sim/terrain/terrainGen/hasAdjacentWater
    br_if $while-continue|0
    local.get $1
    local.get $2
    call $assembly/sim/terrain/terrainGen/hasNearbyTree
    if (result i32)
     call $assembly/sim/behavior/rng/nextRand
     i32.const 100
     i32.rem_s
     i32.const 75
     i32.lt_s
    else
     i32.const 0
    end
    br_if $while-continue|0
    call $assembly/sim/behavior/rng/nextRand
    i32.const 6
    i32.rem_s
    local.tee $3
    i32.const 1
    i32.eq
    if
     local.get $1
     local.get $2
     i32.const 14
     call $assembly/sim/grid/gridOps/setTile
    else
     local.get $3
     i32.const 2
     i32.eq
     if
      local.get $1
      local.get $2
      i32.const 15
      call $assembly/sim/grid/gridOps/setTile
     else
      local.get $3
      i32.const 3
      i32.eq
      if
       local.get $1
       local.get $2
       i32.const 16
       call $assembly/sim/grid/gridOps/setTile
      else
       local.get $3
       i32.const 4
       i32.eq
       if
        local.get $1
        local.get $2
        i32.const 17
        call $assembly/sim/grid/gridOps/setTile
       else
        local.get $3
        i32.const 5
        i32.eq
        if
         local.get $1
         local.get $2
         i32.const 18
         call $assembly/sim/grid/gridOps/setTile
        else
         local.get $1
         local.get $2
         i32.const 5
         call $assembly/sim/grid/gridOps/setTile
        end
       end
      end
     end
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $while-continue|0
   end
  end
 )
 (func $assembly/sim/economy/economy/earn (param $0 i32)
  global.get $assembly/sim/state/parkState/budget
  local.get $0
  i32.add
  global.set $assembly/sim/state/parkState/budget
  global.get $assembly/sim/state/parkState/totalIncome
  local.get $0
  i32.add
  global.set $assembly/sim/state/parkState/totalIncome
 )
 (func $assembly/sim/behavior/navigation/isWalkable (param $0 i32) (result i32)
  local.get $0
  i32.const 255
  i32.and
  local.tee $0
  i32.const 2
  i32.eq
  local.get $0
  i32.const 1
  i32.eq
  i32.or
  local.get $0
  i32.const 3
  i32.eq
  i32.or
  local.get $0
  i32.const 4
  i32.eq
  i32.or
  local.get $0
  i32.const 9
  i32.eq
  i32.or
 )
 (func $assembly/sim/grid/gridOps/isPathTile (param $0 i32) (result i32)
  local.get $0
  i32.const 255
  i32.and
  local.tee $0
  i32.const 2
  i32.eq
  local.get $0
  i32.const 1
  i32.eq
  i32.or
  local.get $0
  i32.const 3
  i32.eq
  i32.or
  local.get $0
  i32.const 4
  i32.eq
  i32.or
 )
 (func $assembly/sim/behavior/navigation/nodeIndex (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $2
  i32.const 2500
  i32.mul
  local.get $1
  i32.const 50
  i32.mul
  i32.add
  local.get $0
  i32.add
 )
 (func $~lib/rt/__newBuffer (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  local.get $1
  call $~lib/rt/itcms/__new
  local.set $1
  local.get $2
  if
   local.get $1
   local.get $2
   local.get $0
   memory.copy
  end
  local.get $1
 )
 (func $assembly/sim/attractions/attractions/isInstantServiceCategory (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  i32.const 18
  i32.eq
  local.get $1
  i32.const 17
  i32.eq
  i32.or
  if
   i32.const 1
   return
  end
  local.get $0
  i32.const 4
  i32.eq
  local.get $0
  i32.const 3
  i32.eq
  i32.or
  local.get $0
  i32.const 5
  i32.eq
  i32.or
 )
 (func $assembly/sim/behavior/employeeBehavior/stepTowardNearestWalkable (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $0
  local.get $1
  call $assembly/sim/behavior/navigation/findNearestWalkableTile
  local.tee $3
  i32.const 0
  i32.lt_s
  if
   i32.const -1
   return
  end
  local.get $3
  i32.const 65535
  i32.and
  local.tee $2
  local.get $0
  i32.sub
  local.tee $4
  i32.const 31
  i32.shr_s
  local.tee $5
  local.get $4
  local.get $5
  i32.add
  i32.xor
  local.get $3
  i32.const 16
  i32.shr_s
  i32.const 65535
  i32.and
  local.tee $3
  local.get $1
  i32.sub
  local.tee $4
  i32.const 31
  i32.shr_s
  local.tee $5
  local.get $4
  local.get $5
  i32.add
  i32.xor
  i32.ge_s
  if
   local.get $0
   local.get $2
   i32.lt_s
   if
    local.get $0
    i32.const 1
    i32.add
    local.set $0
   else
    local.get $0
    local.get $2
    i32.gt_s
    if
     local.get $0
     i32.const 1
     i32.sub
     local.set $0
    else
     local.get $1
     i32.const 1
     i32.add
     local.get $1
     i32.const 1
     i32.sub
     local.get $1
     local.get $1
     local.get $3
     i32.gt_s
     select
     local.get $1
     local.get $3
     i32.lt_s
     select
     local.set $1
    end
   end
  else
   local.get $1
   local.get $3
   i32.lt_s
   if
    local.get $1
    i32.const 1
    i32.add
    local.set $1
   else
    local.get $1
    local.get $3
    i32.gt_s
    if
     local.get $1
     i32.const 1
     i32.sub
     local.set $1
    else
     local.get $0
     i32.const 1
     i32.add
     local.get $0
     i32.const 1
     i32.sub
     local.get $0
     local.get $0
     local.get $2
     i32.gt_s
     select
     local.get $0
     local.get $2
     i32.lt_s
     select
     local.set $0
    end
   end
  end
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   i32.const -1
   return
  end
  local.get $0
  local.get $1
  i32.const 16
  i32.shl
  i32.or
 )
 (func $assembly/index/testBfsPath (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $assembly/sim/behavior/navigation/bfsPath
 )
 (func $assembly/index/testBfsNextStep (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $assembly/sim/behavior/navigation/bfsNextStep
 )
 (func $assembly/index/testRandomWalkStepLevel (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  local.get $1
  local.get $2
  call $assembly/sim/behavior/navigation/randomWalkStepLevel
 )
 (func $assembly/index/testRandomRoamStepLevel (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (result i32)
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  local.get $4
  call $assembly/sim/behavior/navigation/randomRoamStepLevel
 )
 (func $assembly/index/getRngStateForTest (result i32)
  global.get $assembly/sim/state/visitorState/rngState
 )
 (func $assembly/index/setRngStateForTest (param $0 i32)
  local.get $0
  global.set $assembly/sim/state/visitorState/rngState
 )
 (func $assembly/index/nextRandForTest (result i32)
  call $assembly/sim/behavior/rng/nextRand
 )
 (func $assembly/index/testFindAdjacentPath (param $0 i32) (result i32)
  local.get $0
  call $assembly/sim/behavior/employeeBehavior/findAdjacentPath
 )
 (func $assembly/index/testCalcRepairTicks (param $0 i32) (result i32)
  local.get $0
  call $assembly/sim/behavior/employeeBehavior/calcRepairTicks
 )
 (func $assembly/index/testHasSecurityNearby (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  local.get $1
  local.get $2
  call $assembly/sim/behavior/employeeBehavior/hasSecurityNearby
  i32.eqz
  i32.eqz
 )
 (func $assembly/sim/grid/gridOps/getBaseHeight (result i32)
  global.get $assembly/sim/state/gridState/TERRAIN_BASE_HEIGHT
 )
 (func $assembly/sim/grid/gridOps/getMaxHeight (result i32)
  global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
 )
 (func $assembly/sim/grid/gridOps/getLevelsUp (result i32)
  global.get $assembly/sim/state/gridState/TERRAIN_LEVELS_UP
 )
 (func $assembly/sim/grid/gridOps/getLevelsDown (result i32)
  global.get $assembly/sim/state/gridState/TERRAIN_LEVELS_DOWN
 )
 (func $assembly/sim/grid/gridOps/configureTerrain (param $0 i32) (param $1 i32)
  i32.const 1
  local.get $0
  local.get $0
  i32.const 0
  i32.le_s
  select
  global.set $assembly/sim/state/gridState/TERRAIN_LEVELS_UP
  local.get $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.ge_s
  select
  global.set $assembly/sim/state/gridState/TERRAIN_LEVELS_DOWN
  global.get $assembly/sim/state/gridState/TERRAIN_LEVELS_DOWN
  global.set $assembly/sim/state/gridState/TERRAIN_BASE_HEIGHT
  global.get $assembly/sim/state/gridState/TERRAIN_LEVELS_DOWN
  global.get $assembly/sim/state/gridState/TERRAIN_LEVELS_UP
  i32.add
  global.set $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
  global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
  i32.const 1
  i32.sub
  global.set $assembly/sim/state/gridState/TERRAIN_MAX_BUILD_HEIGHT
 )
 (func $assembly/sim/grid/gridOps/isLandTile (param $0 i32) (result i32)
  local.get $0
  i32.const 255
  i32.and
  local.tee $0
  i32.eqz
  local.get $0
  i32.const 10
  i32.eq
  i32.or
  local.get $0
  i32.const 11
  i32.eq
  i32.or
  local.get $0
  i32.const 12
  i32.eq
  i32.or
  local.get $0
  i32.const 13
  i32.eq
  i32.or
 )
 (func $assembly/sim/attractions/attractions/getTemplateCount (result i32)
  global.get $assembly/sim/state/attractionState/templateCount
 )
 (func $assembly/sim/attractions/attractions/getInstanceCount (result i32)
  global.get $assembly/sim/state/attractionState/instanceCount
 )
 (func $assembly/sim/attractions/attractions/isEndpointAdjacentToFootprint (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (result i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $0
  local.get $2
  local.get $4
  i32.add
  i32.lt_s
  local.get $0
  local.get $2
  i32.ge_s
  i32.and
  local.get $1
  local.get $3
  i32.ge_s
  i32.and
  local.get $1
  local.get $3
  local.get $5
  i32.add
  i32.lt_s
  i32.and
  if
   i32.const 0
   return
  end
  local.get $1
  local.get $3
  i32.ge_s
  local.tee $6
  local.get $0
  local.get $2
  i32.const 1
  i32.sub
  i32.eq
  local.tee $7
  local.get $7
  select
  local.set $7
  local.get $6
  local.get $0
  local.get $2
  local.get $4
  i32.add
  local.tee $4
  i32.eq
  local.tee $6
  local.get $6
  select
  local.set $6
  local.get $0
  local.get $2
  i32.ge_s
  local.tee $2
  local.get $1
  local.get $3
  i32.const 1
  i32.sub
  i32.eq
  local.tee $8
  local.get $8
  select
  local.set $8
  i32.const 1
  local.get $0
  local.get $4
  i32.lt_s
  local.tee $0
  local.get $2
  local.get $1
  local.get $3
  local.get $5
  i32.add
  local.tee $2
  i32.eq
  local.tee $3
  local.get $3
  select
  local.tee $3
  local.get $3
  select
  i32.const 1
  local.get $0
  local.get $8
  local.get $8
  select
  i32.const 1
  local.get $1
  local.get $2
  i32.lt_s
  local.tee $0
  local.get $6
  local.get $6
  select
  local.get $0
  local.get $7
  local.get $7
  select
  select
  select
  select
 )
 (func $assembly/sim/attractions/attractions/isEndpointValidForPlacement (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  (local $7 i32)
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  local.get $4
  local.get $5
  call $assembly/sim/attractions/attractions/isEndpointAdjacentToFootprint
  i32.eqz
  if
   i32.const 0
   return
  end
  local.get $6
  i32.const 6
  i32.eq
  local.get $6
  i32.const 1
  i32.eq
  i32.or
  local.get $6
  i32.const 16
  i32.eq
  i32.or
  if (result i32)
   local.get $0
   local.get $2
   i32.ge_s
   local.tee $6
   local.get $1
   local.get $3
   i32.const 1
   i32.sub
   i32.eq
   local.tee $7
   local.get $7
   select
   local.set $7
   i32.const 1
   local.get $0
   local.get $2
   local.get $4
   i32.add
   i32.lt_s
   local.tee $0
   local.get $6
   local.get $1
   local.get $3
   local.get $5
   i32.add
   i32.eq
   local.tee $1
   local.get $1
   select
   local.tee $1
   local.get $1
   select
   local.get $0
   local.get $7
   local.get $7
   select
   select
  else
   i32.const 0
  end
  if
   i32.const 0
   return
  end
  i32.const 1
 )
 (func $assembly/sim/attractions/attractions/getPlacedAttractionCount (result i32)
  call $assembly/sim/attractions/attractions/countActiveInstances
 )
 (func $assembly/sim/attractions/attractions/normalizeRotation (param $0 i32) (result i32)
  local.get $0
  i32.const 360
  i32.rem_s
  local.tee $0
  i32.const 0
  i32.lt_s
  if
   local.get $0
   i32.const 360
   i32.add
   local.set $0
  end
  local.get $0
  i32.const 180
  i32.eq
  local.get $0
  i32.const 90
  i32.eq
  i32.or
  local.get $0
  i32.const 270
  i32.eq
  i32.or
  if
   local.get $0
   return
  end
  i32.const 0
 )
 (func $assembly/sim/economy/economy/spend (param $0 i32) (result i32)
  global.get $assembly/sim/state/parkState/budget
  local.get $0
  i32.lt_s
  if
   i32.const 0
   return
  end
  global.get $assembly/sim/state/parkState/budget
  local.get $0
  i32.sub
  global.set $assembly/sim/state/parkState/budget
  global.get $assembly/sim/state/parkState/totalExpense
  local.get $0
  i32.add
  global.set $assembly/sim/state/parkState/totalExpense
  i32.const 1
 )
 (func $assembly/sim/attractions/attractions/findDefaultEndpoint (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.const 1
  i32.sub
  local.set $4
  loop $for-loop|0
   local.get $4
   local.get $1
   local.get $3
   i32.add
   i32.le_s
   if
    local.get $0
    i32.const 1
    i32.sub
    local.set $5
    loop $for-loop|1
     local.get $5
     local.get $0
     local.get $2
     i32.add
     i32.le_s
     if
      local.get $5
      local.get $4
      local.get $0
      local.get $1
      local.get $2
      local.get $3
      call $assembly/sim/attractions/attractions/isEndpointAdjacentToFootprint
      if
       block $__inlined_func$assembly/sim/attractions/attractions/isPathOrEntranceTileAt$20 (result i32)
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.sub
        global.set $~lib/memory/__stack_pointer
        call $~stack_check
        global.get $~lib/memory/__stack_pointer
        i32.const 0
        i32.store
        local.get $5
        i32.const 0
        i32.lt_s
        local.get $5
        i32.const 50
        i32.ge_s
        i32.or
        local.get $4
        i32.const 0
        i32.lt_s
        i32.or
        local.get $4
        i32.const 50
        i32.ge_s
        i32.or
        if
         global.get $~lib/memory/__stack_pointer
         i32.const 4
         i32.add
         global.set $~lib/memory/__stack_pointer
         i32.const 0
         br $__inlined_func$assembly/sim/attractions/attractions/isPathOrEntranceTileAt$20
        end
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/gridState/gridData
        local.tee $6
        i32.store
        local.get $4
        i32.const 50
        i32.mul
        local.get $5
        i32.add
        local.get $6
        i32.add
        i32.load8_u
        local.set $6
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.add
        global.set $~lib/memory/__stack_pointer
        local.get $6
        i32.const 1
        i32.eq
        local.get $6
        i32.const 9
        i32.eq
        i32.or
        local.get $6
        i32.const 2
        i32.eq
        i32.or
        local.get $6
        i32.const 3
        i32.eq
        i32.or
        local.get $6
        i32.const 4
        i32.eq
        i32.or
       end
       if
        local.get $5
        local.get $4
        i32.const 16
        i32.shl
        i32.or
        return
       end
      end
      local.get $5
      i32.const 1
      i32.add
      local.set $5
      br $for-loop|1
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  i32.const 49
  local.get $1
  local.get $1
  i32.const 49
  i32.gt_s
  select
  local.tee $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.ge_s
  select
  i32.const 16
  i32.shl
  i32.const 49
  local.get $0
  i32.const 1
  i32.sub
  local.tee $0
  local.get $0
  i32.const 49
  i32.gt_s
  select
  local.tee $0
  i32.const 0
  local.get $0
  i32.const 0
  i32.ge_s
  select
  i32.or
 )
 (func $assembly/sim/attractions/attractions/placeAttraction (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  local.get $1
  local.get $2
  i32.const 0
  call $assembly/sim/attractions/attractions/placeAttractionRotated
 )
 (func $assembly/sim/attractions/attractions/placeAttractionWithEndpointsRotated (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (result i32)
  (local $8 i32)
  (local $9 i32)
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/attractionState/templateCount
  i32.ge_s
  i32.or
  if
   i32.const -1
   return
  end
  local.get $3
  local.get $4
  local.get $1
  local.get $2
  local.get $0
  local.get $7
  call $assembly/sim/attractions/attractions/normalizeRotation
  local.tee $8
  call $assembly/sim/attractions/attractions/footprintWForRotation
  local.tee $9
  local.get $0
  local.get $8
  call $assembly/sim/attractions/attractions/footprintHForRotation
  local.tee $7
  local.get $0
  call $assembly/sim/attractions/attractions/isEndpointValidForPlacement
  i32.eqz
  if
   i32.const -1
   return
  end
  local.get $5
  local.get $6
  local.get $1
  local.get $2
  local.get $9
  local.get $7
  local.get $0
  call $assembly/sim/attractions/attractions/isEndpointValidForPlacement
  i32.eqz
  if
   i32.const -1
   return
  end
  local.get $4
  local.get $6
  i32.eq
  local.get $3
  local.get $5
  i32.eq
  i32.and
  if
   i32.const -1
   return
  end
  local.get $0
  local.get $1
  local.get $2
  local.get $8
  call $assembly/sim/attractions/attractions/placeAttractionRotated
  local.tee $0
  i32.const 0
  i32.lt_s
  if
   i32.const -1
   return
  end
  local.get $0
  local.get $3
  local.get $4
  local.get $5
  local.get $6
  call $assembly/sim/attractions/attractions/applyInstanceEndpoints
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/placeAttractionWithEndpoints (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (result i32)
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  local.get $4
  local.get $5
  local.get $6
  i32.const 0
  call $assembly/sim/attractions/attractions/placeAttractionWithEndpointsRotated
 )
 (func $assembly/sim/grid/gridOps/recomputeNeighborRamps (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.const 1
  i32.sub
  call $assembly/sim/grid/gridOps/recomputeRamp
  local.get $0
  i32.const 1
  i32.add
  local.get $1
  call $assembly/sim/grid/gridOps/recomputeRamp
  local.get $0
  local.get $1
  i32.const 1
  i32.add
  call $assembly/sim/grid/gridOps/recomputeRamp
  local.get $0
  i32.const 1
  i32.sub
  local.get $1
  call $assembly/sim/grid/gridOps/recomputeRamp
 )
 (func $assembly/sim/grid/gridOps/recomputeNeighborUpperRamps (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.const 1
  i32.sub
  call $assembly/sim/grid/gridOps/recomputeUpperRamp
  local.get $0
  i32.const 1
  i32.add
  local.get $1
  call $assembly/sim/grid/gridOps/recomputeUpperRamp
  local.get $0
  local.get $1
  i32.const 1
  i32.add
  call $assembly/sim/grid/gridOps/recomputeUpperRamp
  local.get $0
  i32.const 1
  i32.sub
  local.get $1
  call $assembly/sim/grid/gridOps/recomputeUpperRamp
 )
 (func $assembly/sim/grid/gridOps/recomputeNeighborPathLevelRamps (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  local.get $1
  i32.const 1
  i32.sub
  local.tee $3
  local.get $2
  call $assembly/sim/grid/gridOps/recomputePathLevelRamp
  local.get $0
  i32.const 1
  i32.add
  local.tee $4
  local.get $1
  local.get $2
  call $assembly/sim/grid/gridOps/recomputePathLevelRamp
  local.get $0
  local.get $1
  i32.const 1
  i32.add
  local.tee $5
  local.get $2
  call $assembly/sim/grid/gridOps/recomputePathLevelRamp
  local.get $0
  i32.const 1
  i32.sub
  local.tee $6
  local.get $1
  local.get $2
  call $assembly/sim/grid/gridOps/recomputePathLevelRamp
  local.get $2
  i32.const 0
  i32.gt_s
  if
   local.get $0
   local.get $3
   local.get $2
   i32.const 1
   i32.sub
   local.tee $2
   call $assembly/sim/grid/gridOps/recomputePathLevelRamp
   local.get $4
   local.get $1
   local.get $2
   call $assembly/sim/grid/gridOps/recomputePathLevelRamp
   local.get $0
   local.get $5
   local.get $2
   call $assembly/sim/grid/gridOps/recomputePathLevelRamp
   local.get $6
   local.get $1
   local.get $2
   call $assembly/sim/grid/gridOps/recomputePathLevelRamp
  end
 )
 (func $assembly/sim/employees/employees/getMechanicCount (result i32)
  global.get $assembly/sim/state/employeeState/mechanicCount
 )
 (func $assembly/sim/employees/employees/getCleanerCount (result i32)
  global.get $assembly/sim/state/employeeState/cleanerCount
 )
 (func $assembly/sim/employees/employees/getSecurityCount (result i32)
  global.get $assembly/sim/state/employeeState/securityCount
 )
 (func $assembly/sim/employees/employees/getEntertainerCount (result i32)
  global.get $assembly/sim/state/employeeState/entertainerCount
 )
 (func $assembly/sim/employees/employees/getBudget (result i32)
  global.get $assembly/sim/state/parkState/budget
 )
 (func $assembly/sim/employees/employees/setBudget (param $0 i32)
  local.get $0
  global.set $assembly/sim/state/parkState/budget
 )
 (func $assembly/sim/employees/employees/getEntranceTicket (result i32)
  global.get $assembly/sim/state/parkState/entranceTicket
 )
 (func $assembly/sim/employees/employees/setEntranceTicket (param $0 i32)
  local.get $0
  i32.const 0
  local.get $0
  i32.const 0
  i32.ge_s
  select
  global.set $assembly/sim/state/parkState/entranceTicket
 )
 (func $assembly/sim/employees/employees/getTotalIncome (result i32)
  global.get $assembly/sim/state/parkState/totalIncome
 )
 (func $assembly/sim/employees/employees/getTotalExpense (result i32)
  global.get $assembly/sim/state/parkState/totalExpense
 )
 (func $assembly/sim/employees/employees/getParkAttractiveness (result i32)
  global.get $assembly/sim/state/parkState/parkAttractiveness
 )
 (func $assembly/sim/employees/employees/getCriminalRate (result i32)
  global.get $assembly/sim/state/parkState/criminalRatePerThousand
 )
 (func $assembly/sim/employees/employees/setCriminalRate (param $0 i32)
  i32.const 300
  local.get $0
  i32.const 0
  local.get $0
  i32.const 0
  i32.ge_s
  select
  local.tee $0
  local.get $0
  i32.const 300
  i32.gt_s
  select
  global.set $assembly/sim/state/parkState/criminalRatePerThousand
 )
 (func $assembly/sim/employees/employees/getTheftCount (result i32)
  global.get $assembly/sim/state/parkState/theftCount
 )
 (func $assembly/sim/employees/employees/getVandalismCount (result i32)
  global.get $assembly/sim/state/parkState/vandalismCount
 )
 (func $assembly/sim/employees/employees/drownMechanic (param $0 i32) (result i32)
  local.get $0
  call $assembly/sim/employees/employees/fireMechanic
  i32.const 1
  i32.eq
  if
   call $assembly/sim/employees/employees/applyDrowningPenalty
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $assembly/sim/employees/employees/drownCleaner (param $0 i32) (result i32)
  local.get $0
  call $assembly/sim/employees/employees/fireCleaner
  i32.const 1
  i32.eq
  if
   call $assembly/sim/employees/employees/applyDrowningPenalty
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $assembly/sim/employees/employees/drownSecurity (param $0 i32) (result i32)
  local.get $0
  call $assembly/sim/employees/employees/fireSecurity
  i32.const 1
  i32.eq
  if
   call $assembly/sim/employees/employees/applyDrowningPenalty
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $assembly/sim/employees/employees/drownEntertainer (param $0 i32) (result i32)
  local.get $0
  call $assembly/sim/employees/employees/fireEntertainer
  i32.const 1
  i32.eq
  if
   call $assembly/sim/employees/employees/applyDrowningPenalty
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $assembly/sim/visitors/visitors/getActiveVisitors (result i32)
  global.get $assembly/sim/state/visitorState/activeVisitors
 )
 (func $assembly/sim/visitors/visitors/getTickCount (result i32)
  global.get $assembly/sim/state/visitorState/tickCount
 )
 (func $assembly/sim/visitors/visitors/setIsRaining (param $0 i32)
  local.get $0
  i32.const 0
  i32.gt_s
  global.set $assembly/sim/state/parkState/isRainingNow
 )
 (func $assembly/sim/visitors/visitors/getIsRaining (result i32)
  global.get $assembly/sim/state/parkState/isRainingNow
 )
 (func $assembly/sim/visitors/visitors/reportVandalism (param $0 i32) (param $1 i32)
  global.get $assembly/sim/state/parkState/vandalismCount
  i32.const 1
  i32.add
  global.set $assembly/sim/state/parkState/vandalismCount
  local.get $0
  local.get $1
  i32.const 14
  call $assembly/sim/visitors/visitors/applyCrimeShock
 )
 (func $assembly/sim/placement/placement/adjustTerrainZone (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  local.get $2
  i32.eqz
  if
   local.get $0
   local.get $1
   local.get $3
   call $assembly/sim/placement/placement/adjustTerrain
   return
  end
  block $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77 (result i32)
   i32.const 1
   local.get $2
   i32.const 1
   i32.eq
   br_if $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77
   drop
   i32.const 2
   local.get $2
   i32.const 2
   i32.eq
   br_if $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77
   drop
   i32.const 4
   local.get $2
   i32.const 3
   i32.eq
   br_if $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77
   drop
   i32.const 8
   local.get $2
   i32.const 4
   i32.eq
   br_if $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77
   drop
   i32.const 3
   local.get $2
   i32.const 5
   i32.eq
   br_if $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77
   drop
   i32.const 6
   local.get $2
   i32.const 6
   i32.eq
   br_if $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77
   drop
   i32.const 12
   local.get $2
   i32.const 7
   i32.eq
   br_if $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77
   drop
   i32.const 9
   local.get $2
   i32.const 8
   i32.eq
   br_if $__inlined_func$assembly/sim/terrainZone/zoneToCornerMask$77
   drop
   i32.const 15
  end
  local.tee $2
  i32.const 15
  i32.eq
  if
   local.get $0
   local.get $1
   local.get $3
   call $assembly/sim/placement/placement/adjustTerrain
   return
  end
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $assembly/sim/placement/placement/adjustTerrainCorners
 )
 (func $assembly/sim/placement/placement/placePath (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.const 0
  call $assembly/sim/placement/placement/placePathVariant
 )
 (func $assembly/sim/placement/placement/placeTree (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.const 0
  call $assembly/sim/placement/placement/placeTreeVariant
 )
 (func $~lib/rt/itcms/__pin (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $1
   i32.load offset=4
   i32.const 3
   i32.and
   i32.const 3
   i32.eq
   if
    i32.const 3344
    i32.const 1232
    i32.const 338
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   call $~lib/rt/itcms/Object#unlink
   local.get $1
   global.get $~lib/rt/itcms/pinSpace
   i32.const 3
   call $~lib/rt/itcms/Object#linkTo
  end
  local.get $0
 )
 (func $~lib/rt/itcms/__unpin (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.const 3
  i32.ne
  if
   i32.const 3408
   i32.const 1232
   i32.const 352
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/state
  i32.const 1
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
  else
   local.get $0
   call $~lib/rt/itcms/Object#unlink
   local.get $0
   global.get $~lib/rt/itcms/fromSpace
   global.get $~lib/rt/itcms/white
   call $~lib/rt/itcms/Object#linkTo
  end
 )
 (func $~lib/rt/itcms/__collect
  global.get $~lib/rt/itcms/state
  i32.const 0
  i32.gt_s
  if
   loop $while-continue|0
    global.get $~lib/rt/itcms/state
    if
     call $~lib/rt/itcms/step
     drop
     br $while-continue|0
    end
   end
  end
  call $~lib/rt/itcms/step
  drop
  loop $while-continue|1
   global.get $~lib/rt/itcms/state
   if
    call $~lib/rt/itcms/step
    drop
    br $while-continue|1
   end
  end
  global.get $~lib/rt/itcms/total
  i64.extend_i32_u
  i64.const 200
  i64.mul
  i64.const 100
  i64.div_u
  i32.wrap_i64
  i32.const 1024
  i32.add
  global.set $~lib/rt/itcms/threshold
 )
 (func $~lib/rt/__visit_globals
  (local $0 i32)
  i32.const 1360
  call $~lib/rt/itcms/__visit
  i32.const 1056
  call $~lib/rt/itcms/__visit
  i32.const 1168
  call $~lib/rt/itcms/__visit
  i32.const 3344
  call $~lib/rt/itcms/__visit
  i32.const 3408
  call $~lib/rt/itcms/__visit
  global.get $assembly/sim/state/gridState/gridData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/gridState/heightData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/gridState/cornerMaskData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/gridState/upperPathVariantData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/gridState/upperPathHeightData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/gridState/rampDirData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/gridState/upperRampDirData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/gridState/pathLevelData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/gridState/pathLevelRampData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechActive
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechTarget
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechRepairTimer
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechUid
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechHiredTick
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechRepairsCompleted
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechPatrolX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechPatrolY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechAreaCount
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechAreaX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/mechAreaY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerActive
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerTargetX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerTargetY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerCleanTimer
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerUid
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerHiredTick
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerPathsCleaned
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerPatrolX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerPatrolY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerAreaCount
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerAreaX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/cleanerAreaY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityActive
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityTargetVisitor
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityPatrolX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityPatrolY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityUid
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityHiredTick
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityIncidentsHandled
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityAreaCount
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityAreaX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/securityAreaY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerActive
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerPatrolX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerPatrolY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerUid
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerHiredTick
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerAreaCount
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerAreaX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/employeeState/entertainerAreaY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/parkState/pukeData
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplFootprintW
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplFootprintH
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplBuildPrice
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplTicketPrice
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplCapacity
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplCategory
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplAppeal
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplRideTicks
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplMonthlyCost
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplRequiredExcitement
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/tmplNauseaGain
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instRotation
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instActive
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instTicketPrice
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instCapacity
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instCurrentRiders
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instEntranceX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instEntranceY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instExitX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instExitY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instBuildTick
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instBroken
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instRepairTicks
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instTotalVisitors
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instTotalRevenue
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instMonthlyRevenue
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instQueueLength
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instEstimatedWaitTicks
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/attractionState/instPopularity
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vState
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vTarget
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vTimer
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vSatisfaction
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vNeeds
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vPaid
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vStuckTimer
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vWallet
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vQueueX
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vQueueY
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vQueueOrder
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vLevel
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vExcitement
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vExcitementTolerance
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vNausea
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vPukeTimer
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vCriminal
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vCrimeTimer
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vCrimeCooldown
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vCrowdComplaintCooldown
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vBalloonTimer
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/visitorState/vUmbrellaTimer
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  i32.const 1568
  call $~lib/rt/itcms/__visit
  i32.const 1696
  call $~lib/rt/itcms/__visit
  global.get $assembly/sim/noise/perm
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/noise/permMod12
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  i32.const 1824
  call $~lib/rt/itcms/__visit
  global.get $assembly/sim/state/pathfindingState/bfsQueue
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/pathfindingState/bfsVisited
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/pathfindingState/bfsDist
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/sim/state/pathfindingState/bfsParent
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  block $invalid
   block $~lib/array/Array<i32>
    block $~lib/staticarray/StaticArray<f64>
     block $~lib/staticarray/StaticArray<i32>
      block $~lib/staticarray/StaticArray<i8>
       block $~lib/staticarray/StaticArray<u8>
        block $~lib/arraybuffer/ArrayBufferView
         block $~lib/string/String
          block $~lib/arraybuffer/ArrayBuffer
           block $~lib/object/Object
            local.get $0
            i32.const 8
            i32.sub
            i32.load
            br_table $~lib/object/Object $~lib/arraybuffer/ArrayBuffer $~lib/string/String $~lib/arraybuffer/ArrayBufferView $~lib/staticarray/StaticArray<u8> $~lib/staticarray/StaticArray<i8> $~lib/staticarray/StaticArray<i32> $~lib/staticarray/StaticArray<f64> $~lib/array/Array<i32> $invalid
           end
           return
          end
          return
         end
         return
        end
        local.get $0
        i32.load
        local.tee $0
        if
         local.get $0
         call $~lib/rt/itcms/__visit
        end
        return
       end
       return
      end
      return
     end
     return
    end
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load
   call $~lib/rt/itcms/__visit
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  unreachable
 )
 (func $~start
  call $start:assembly/index
 )
 (func $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 3496
  i32.lt_s
  if
   i32.const 36288
   i32.const 36336
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $assembly/sim/grid/gridOps/setTile (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 50
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  local.get $1
  i32.const 0
  i32.ge_s
  i32.and
  local.get $1
  i32.const 50
  i32.lt_s
  i32.and
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $3
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $3
   i32.add
   local.get $2
   i32.store8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/grid/gridOps/clearGrid
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 2500
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    global.get $assembly/sim/state/gridState/TERRAIN_BASE_HEIGHT
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/cornerMaskData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathVariantData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 255
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathHeightData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/rampDirData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperRampDirData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   i32.const 22500
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 255
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelRampData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  i32.const 25
  i32.const 49
  i32.const 9
  call $assembly/sim/grid/gridOps/setTile
  i32.const 24
  i32.const 49
  i32.const 9
  call $assembly/sim/grid/gridOps/setTile
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/visitors/visitors/resetVisitor (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vState
  local.tee $2
  i32.store
  local.get $0
  local.get $2
  i32.add
  i32.const 255
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vTarget
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vTimer
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vSatisfaction
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 60
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vPaid
  local.tee $2
  i32.store
  local.get $0
  local.get $2
  i32.add
  i32.const 0
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vStuckTimer
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vWallet
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  call $assembly/sim/behavior/rng/nextRand
  i32.const 101
  i32.rem_s
  i32.const 20
  i32.add
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vQueueX
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vQueueY
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vQueueOrder
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vLevel
  local.tee $2
  i32.store
  local.get $0
  local.get $2
  i32.add
  i32.const 0
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vExcitement
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  call $assembly/sim/behavior/rng/nextRand
  i32.const 40
  i32.rem_s
  i32.const 20
  i32.add
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vExcitementTolerance
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  call $assembly/sim/behavior/rng/nextRand
  i32.const 35
  i32.rem_s
  i32.const 25
  i32.add
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vNausea
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  call $assembly/sim/behavior/rng/nextRand
  i32.const 12
  i32.rem_s
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vPukeTimer
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vCriminal
  local.tee $2
  i32.store
  local.get $0
  local.get $2
  i32.add
  i32.const 0
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vCrimeTimer
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vCrimeCooldown
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vCrowdComplaintCooldown
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vBalloonTimer
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vUmbrellaTimer
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  loop $for-loop|0
   local.get $1
   i32.const 6
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vNeeds
    local.tee $2
    i32.store
    local.get $2
    local.get $0
    i32.const 6
    i32.mul
    local.get $1
    i32.add
    call $assembly/sim/behavior/rng/nextRand
    i32.const 40
    i32.rem_s
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/terrain/terrainGen/canPlaceNaturalTile (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 0
   i32.lt_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $2
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $2
   i32.add
   i32.load8_u
   br_if $folding-inner0
   local.get $0
   i32.const 25
   i32.sub
   local.tee $0
   i32.const -4
   i32.ge_s
   local.get $1
   i32.const 46
   i32.ge_s
   i32.and
   local.get $0
   i32.const 4
   i32.le_s
   i32.and
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/terrain/terrainGen/hasAdjacentWater (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   i32.const 0
   i32.gt_s
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $2
    i32.store
    local.get $0
    i32.const 1
    i32.sub
    local.get $1
    i32.const 50
    i32.mul
    i32.add
    local.get $2
    i32.add
    i32.load8_u
    i32.const 8
    i32.eq
   else
    i32.const 0
   end
   br_if $folding-inner0
   local.get $0
   i32.const 1
   i32.add
   local.tee $2
   i32.const 50
   i32.lt_s
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $3
    i32.store
    local.get $1
    i32.const 50
    i32.mul
    local.get $2
    i32.add
    local.get $3
    i32.add
    i32.load8_u
    i32.const 8
    i32.eq
   else
    i32.const 0
   end
   br_if $folding-inner0
   local.get $1
   i32.const 0
   i32.gt_s
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $2
    i32.store
    local.get $1
    i32.const 1
    i32.sub
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.get $2
    i32.add
    i32.load8_u
    i32.const 8
    i32.eq
   else
    i32.const 0
   end
   br_if $folding-inner0
   local.get $1
   i32.const 1
   i32.add
   local.tee $1
   i32.const 50
   i32.lt_s
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $2
    i32.store
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.get $2
    i32.add
    i32.load8_u
    i32.const 8
    i32.eq
   else
    i32.const 0
   end
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/terrain/terrainGen/growLake (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   call $assembly/sim/terrain/terrainGen/canPlaceNaturalTile
   i32.eqz
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $3
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $3
   i32.add
   i32.load8_u
   global.get $assembly/sim/state/gridState/TERRAIN_BASE_HEIGHT
   i32.const 1
   i32.sub
   i32.gt_s
   br_if $folding-inner0
   local.get $0
   local.set $3
   local.get $1
   local.set $5
   local.get $2
   i32.const 40
   i32.mul
   local.set $7
   loop $while-continue|0
    local.get $7
    local.get $8
    i32.gt_s
    local.get $2
    local.get $4
    i32.gt_s
    i32.and
    if
     local.get $8
     i32.const 1
     i32.add
     local.set $8
     local.get $3
     local.get $5
     call $assembly/sim/terrain/terrainGen/canPlaceNaturalTile
     if (result i32)
      local.get $4
      if (result i32)
       local.get $3
       local.get $5
       call $assembly/sim/terrain/terrainGen/hasAdjacentWater
      else
       i32.const 1
      end
     else
      i32.const 0
     end
     if
      local.get $3
      local.get $5
      i32.const 8
      call $assembly/sim/grid/gridOps/setTile
      local.get $4
      i32.const 1
      i32.add
      local.set $4
     end
     call $assembly/sim/behavior/rng/nextRand
     i32.const 4
     i32.rem_s
     local.tee $6
     if
      local.get $6
      i32.const 1
      i32.eq
      if
       local.get $3
       i32.const 1
       i32.sub
       local.set $3
      else
       local.get $5
       i32.const 1
       i32.add
       local.get $5
       i32.const 1
       i32.sub
       local.get $6
       i32.const 2
       i32.eq
       select
       local.set $5
      end
     else
      local.get $3
      i32.const 1
      i32.add
      local.set $3
     end
     i32.const 1
     local.get $3
     local.get $3
     i32.const 0
     i32.le_s
     select
     local.tee $3
     i32.const 48
     i32.gt_s
     if
      i32.const 48
      local.set $3
     end
     i32.const 1
     local.get $5
     local.get $5
     i32.const 0
     i32.le_s
     select
     local.tee $5
     i32.const 48
     i32.gt_s
     if
      i32.const 48
      local.set $5
     end
     call $assembly/sim/behavior/rng/nextRand
     i32.const 100
     i32.rem_s
     i32.const 20
     i32.lt_s
     if
      local.get $0
      call $assembly/sim/behavior/rng/nextRand
      i32.const 3
      i32.rem_s
      i32.const 1
      i32.sub
      i32.add
      local.set $6
      i32.const 48
      i32.const 1
      local.get $1
      call $assembly/sim/behavior/rng/nextRand
      i32.const 3
      i32.rem_s
      i32.const 1
      i32.sub
      i32.add
      local.tee $3
      local.get $3
      i32.const 0
      i32.le_s
      select
      local.tee $3
      local.get $3
      i32.const 48
      i32.gt_s
      select
      local.set $5
      i32.const 1
      local.get $6
      local.get $6
      i32.const 0
      i32.le_s
      select
      local.tee $3
      i32.const 48
      i32.gt_s
      if
       i32.const 48
       local.set $3
      end
     end
     br $while-continue|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $4
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/terrain/terrainGen/hasNearbyTree (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const -1
  local.set $2
  loop $for-loop|0
   local.get $2
   i32.const 1
   i32.le_s
   if
    i32.const -1
    local.set $3
    loop $for-loop|1
     local.get $3
     i32.const 1
     i32.le_s
     if
      block $for-continue|1
       local.get $2
       local.get $3
       i32.or
       i32.eqz
       br_if $for-continue|1
       local.get $0
       local.get $3
       i32.add
       local.tee $5
       i32.const 0
       i32.lt_s
       local.get $5
       i32.const 50
       i32.ge_s
       i32.or
       local.get $1
       local.get $2
       i32.add
       local.tee $6
       i32.const 0
       i32.lt_s
       i32.or
       local.get $6
       i32.const 50
       i32.ge_s
       i32.or
       br_if $for-continue|1
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/gridState/gridData
       local.tee $4
       i32.store
       local.get $6
       i32.const 50
       i32.mul
       local.get $5
       i32.add
       local.get $4
       i32.add
       i32.load8_u
       local.tee $4
       i32.const 6
       i32.eq
       local.get $4
       i32.const 5
       i32.eq
       i32.or
       local.get $4
       i32.const 7
       i32.eq
       i32.or
       local.get $4
       i32.const 14
       i32.eq
       i32.or
       local.get $4
       i32.const 15
       i32.eq
       i32.or
       local.get $4
       i32.const 16
       i32.eq
       i32.or
       local.get $4
       i32.const 17
       i32.eq
       i32.or
       local.get $4
       i32.const 18
       i32.eq
       i32.or
       if
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.add
        global.set $~lib/memory/__stack_pointer
        i32.const 1
        return
       end
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|1
     end
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/index/initSimulation
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  call $assembly/sim/grid/gridOps/clearGrid
  i32.const 10000
  global.set $assembly/sim/state/parkState/budget
  i32.const 5
  global.set $assembly/sim/state/parkState/entranceTicket
  i32.const 0
  global.set $assembly/sim/state/parkState/totalIncome
  i32.const 0
  global.set $assembly/sim/state/parkState/totalExpense
  i32.const 0
  global.set $assembly/sim/state/visitorState/activeVisitors
  i32.const 0
  global.set $assembly/sim/state/visitorState/tickCount
  i32.const 0
  global.set $assembly/sim/state/visitorState/spawnCooldown
  i32.const 0
  global.set $assembly/sim/state/attractionState/instanceCount
  call $assembly/sim/behavior/rng/hostSeed
  f64.const 2147483647
  f64.mul
  i32.trunc_sat_f64_s
  local.tee $0
  i32.eqz
  if
   i32.const 12345
   local.set $0
  end
  i32.const 0
  local.get $0
  i32.sub
  local.get $0
  local.get $0
  i32.const 0
  i32.lt_s
  select
  global.set $assembly/sim/state/visitorState/rngState
  i32.const 0
  local.set $1
  loop $for-loop|0
   local.get $1
   i32.const 100
   i32.lt_s
   if
    local.get $1
    call $assembly/sim/visitors/visitors/resetVisitor
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  i32.const 0
  local.set $1
  loop $for-loop|1
   local.get $1
   i32.const 2500
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/parkState/pukeData
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|1
   end
  end
  i32.const 0
  local.set $1
  loop $for-loop|2
   local.get $1
   i32.const 128
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instCapacity
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instCurrentRiders
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instEntranceX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instEntranceY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instExitX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instExitY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instBuildTick
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instBroken
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instQueueLength
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instEstimatedWaitTicks
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instPopularity
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instRepairTicks
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instTotalVisitors
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instTotalRevenue
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instMonthlyRevenue
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
  i32.const 0
  global.set $assembly/sim/state/employeeState/mechanicCount
  i32.const 1
  global.set $assembly/sim/state/employeeState/nextEmployeeUid
  i32.const 0
  local.set $1
  loop $for-loop|3
   local.get $1
   i32.const 8
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechActive
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 25
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 49
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechTarget
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechRepairTimer
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechUid
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechHiredTick
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechRepairsCompleted
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechPatrolX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechPatrolY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechAreaCount
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    i32.const 0
    local.set $0
    loop $for-loop|4
     local.get $0
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechAreaX
      local.tee $2
      i32.store
      local.get $2
      local.get $1
      i32.const 2
      i32.shl
      local.get $0
      i32.add
      local.tee $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechAreaY
      local.tee $3
      i32.store
      local.get $3
      local.get $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|4
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|3
   end
  end
  i32.const 0
  global.set $assembly/sim/state/employeeState/cleanerCount
  i32.const 0
  local.set $1
  loop $for-loop|5
   local.get $1
   i32.const 8
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerActive
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 25
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 49
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerTargetX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerTargetY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerCleanTimer
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerUid
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerHiredTick
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPathsCleaned
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPatrolX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPatrolY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerAreaCount
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    i32.const 0
    local.set $0
    loop $for-loop|6
     local.get $0
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerAreaX
      local.tee $2
      i32.store
      local.get $2
      local.get $1
      i32.const 2
      i32.shl
      local.get $0
      i32.add
      local.tee $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerAreaY
      local.tee $3
      i32.store
      local.get $3
      local.get $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|6
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|5
   end
  end
  i32.const 0
  global.set $assembly/sim/state/employeeState/securityCount
  i32.const 0
  local.set $1
  loop $for-loop|7
   local.get $1
   i32.const 8
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityActive
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 25
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 49
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityTargetVisitor
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityPatrolX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityPatrolY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityUid
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityHiredTick
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityIncidentsHandled
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityAreaCount
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    i32.const 0
    local.set $0
    loop $for-loop|8
     local.get $0
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityAreaX
      local.tee $2
      i32.store
      local.get $2
      local.get $1
      i32.const 2
      i32.shl
      local.get $0
      i32.add
      local.tee $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityAreaY
      local.tee $3
      i32.store
      local.get $3
      local.get $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|8
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|7
   end
  end
  i32.const 0
  global.set $assembly/sim/state/employeeState/entertainerCount
  i32.const 0
  local.set $1
  loop $for-loop|9
   local.get $1
   i32.const 8
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerActive
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 25
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 49
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerPatrolX
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerPatrolY
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerUid
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerHiredTick
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerAreaCount
    local.tee $0
    i32.store
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    i32.const 0
    local.set $0
    loop $for-loop|10
     local.get $0
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/entertainerAreaX
      local.tee $2
      i32.store
      local.get $2
      local.get $1
      i32.const 2
      i32.shl
      local.get $0
      i32.add
      local.tee $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/entertainerAreaY
      local.tee $3
      i32.store
      local.get $3
      local.get $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|10
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|9
   end
  end
  i32.const 100
  global.set $assembly/sim/state/parkState/parkAttractiveness
  i32.const 2
  global.set $assembly/sim/state/parkState/criminalRatePerThousand
  i32.const 0
  global.set $assembly/sim/state/parkState/theftCount
  i32.const 0
  global.set $assembly/sim/state/parkState/vandalismCount
  i32.const 0
  global.set $assembly/sim/state/parkState/isRainingNow
  i32.const 0
  local.set $0
  call $assembly/sim/behavior/rng/nextRand
  i32.const 2
  i32.rem_s
  i32.const 1
  i32.add
  local.set $3
  loop $for-loop|00
   local.get $0
   local.get $3
   i32.lt_s
   if
    i32.const 0
    local.set $2
    i32.const 0
    local.set $1
    loop $for-loop|11
     local.get $2
     i32.eqz
     local.get $1
     i32.const 20
     i32.lt_s
     i32.and
     if
      call $assembly/sim/behavior/rng/nextRand
      i32.const 46
      i32.rem_s
      i32.const 2
      i32.add
      call $assembly/sim/behavior/rng/nextRand
      i32.const 43
      i32.rem_s
      i32.const 2
      i32.add
      call $assembly/sim/behavior/rng/nextRand
      i32.const 15
      i32.rem_s
      i32.const 10
      i32.add
      call $assembly/sim/terrain/terrainGen/growLake
      local.set $2
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|11
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|00
   end
  end
  call $assembly/sim/behavior/rng/nextRand
  i32.const 46
  i32.rem_s
  i32.const 40
  i32.add
  call $assembly/sim/terrain/terrainGen/placeSparseTrees
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/setInstQueueStats (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 128
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instQueueLength
  local.tee $4
  i32.store
  local.get $4
  local.get $0
  local.get $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.ge_s
  select
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instEstimatedWaitTicks
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $2
  i32.const 0
  local.get $2
  i32.const 0
  i32.ge_s
  select
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instPopularity
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 100
  local.get $3
  local.get $3
  i32.const 100
  i32.gt_s
  select
  local.tee $0
  i32.const 0
  local.get $0
  i32.const 0
  i32.ge_s
  select
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/getInstAgeMonths (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 128
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instActive
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instBuildTick
  local.tee $1
  i32.store
  global.get $assembly/sim/state/visitorState/tickCount
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  i32.sub
  i32.const 3000
  i32.div_s
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
  i32.const 0
  local.get $0
  i32.const 0
  i32.ge_s
  select
 )
 (func $assembly/sim/attractions/attractions/getInstEffectiveAppeal (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 128
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instActive
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplAppeal
  local.tee $1
  i32.store
  local.get $1
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $1
  local.get $0
  call $assembly/sim/attractions/attractions/getInstAgeMonths
  i32.sub
  local.tee $2
  i32.const 10
  local.get $1
  i32.const 2
  i32.div_s
  local.tee $0
  local.get $0
  i32.const 10
  i32.lt_s
  select
  local.tee $0
  i32.ge_s
  if
   local.get $2
   local.set $0
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/recomputeQueueStats
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  loop $for-loop|0
   local.get $0
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $1
    i32.store
    block $for-continue|0
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
     if
      local.get $0
      i32.const 0
      i32.const 0
      i32.const 0
      call $assembly/sim/attractions/attractions/setInstQueueStats
      br $for-continue|0
     end
     local.get $0
     i32.const 0
     i32.const 0
     local.get $0
     call $assembly/sim/attractions/attractions/getInstEffectiveAppeal
     call $assembly/sim/attractions/attractions/setInstQueueStats
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $1
    i32.store
    block $for-continue|1
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 2
     i32.ne
     br_if $for-continue|1
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $1
     i32.const 0
     i32.lt_s
     local.get $1
     global.get $assembly/sim/state/attractionState/instanceCount
     i32.ge_s
     i32.or
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instActive
      local.tee $2
      i32.store
      local.get $1
      local.get $2
      i32.add
      i32.load8_u
      i32.const 1
      i32.ne
     end
     br_if $for-continue|1
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instQueueLength
     local.tee $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instQueueLength
     local.tee $3
     i32.store offset=4
     local.get $2
     local.get $1
     local.get $3
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 1
     i32.add
     call $~lib/staticarray/StaticArray<i32>#__uset
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|2
   local.get $0
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.load8_u
    i32.const 1
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instTemplateId
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     i32.load
     local.set $2
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instCapacity
     local.tee $3
     i32.store
     local.get $1
     local.get $3
     i32.add
     i32.load
     local.set $3
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instQueueLength
     local.tee $4
     i32.store
     local.get $1
     local.get $4
     i32.add
     i32.load
     local.set $4
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instCurrentRiders
     local.tee $5
     i32.store
     local.get $1
     local.get $5
     i32.add
     i32.load
     local.set $1
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/tmplRideTicks
     local.tee $5
     i32.store
     local.get $1
     local.get $4
     i32.add
     i32.const 6
     local.get $5
     local.get $2
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $1
     local.get $1
     i32.const 6
     i32.lt_s
     select
     i32.mul
     i32.const 1
     local.get $3
     local.get $3
     i32.const 0
     i32.le_s
     select
     i32.div_s
     local.tee $1
     i32.const 10
     i32.div_s
     local.get $4
     i32.const 1
     i32.shl
     i32.add
     local.set $2
     local.get $0
     local.get $4
     local.get $1
     i32.const 5
     local.get $0
     call $assembly/sim/attractions/attractions/getInstEffectiveAppeal
     i32.const 45
     local.get $2
     local.get $2
     i32.const 45
     i32.gt_s
     select
     i32.sub
     local.tee $1
     local.get $1
     i32.const 5
     i32.lt_s
     select
     call $assembly/sim/attractions/attractions/setInstQueueStats
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|2
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/employees/employees/applyMonthlyOperatingCosts
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $assembly/sim/state/employeeState/mechanicCount
  i32.const 75
  i32.mul
  global.get $assembly/sim/state/employeeState/cleanerCount
  i32.const 55
  i32.mul
  i32.add
  global.get $assembly/sim/state/employeeState/securityCount
  i32.const 80
  i32.mul
  i32.add
  global.get $assembly/sim/state/employeeState/entertainerCount
  i32.const 70
  i32.mul
  i32.add
  local.set $0
  loop $for-loop|0
   local.get $1
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $2
    i32.store
    local.get $1
    local.get $2
    i32.add
    i32.load8_u
    i32.const 1
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instTemplateId
     local.tee $2
     i32.store
     local.get $2
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.set $3
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/tmplMonthlyCost
     local.tee $2
     i32.store
     local.get $0
     local.get $2
     local.get $3
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.add
     local.set $0
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  local.get $0
  i32.const 0
  i32.le_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $assembly/sim/state/parkState/budget
  local.get $0
  i32.sub
  global.set $assembly/sim/state/parkState/budget
  global.get $assembly/sim/state/parkState/totalExpense
  local.get $0
  i32.add
  global.set $assembly/sim/state/parkState/totalExpense
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/behavior/employeeBehavior/calcRepairTicks (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $0
  i32.add
  i32.load
  local.set $1
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instBuildTick
  local.tee $2
  i32.store
  global.get $assembly/sim/state/visitorState/tickCount
  local.get $0
  local.get $2
  i32.add
  i32.load
  i32.sub
  i32.const 3000
  i32.div_s
  local.set $0
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplBuildPrice
  local.tee $2
  i32.store
  local.get $2
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  i32.const 25
  i32.div_s
  i32.const 30
  i32.add
  local.get $0
  i32.const 0
  local.get $0
  i32.const 0
  i32.ge_s
  select
  i32.const 3
  i32.mul
  i32.add
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/updateAttractionBreakdowns
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $1
    i32.store
    block $for-continue|0
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instBroken
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 1
     i32.eq
     br_if $for-continue|0
     local.get $0
     call $assembly/sim/attractions/attractions/getInstAgeMonths
     i32.const 6
     i32.mul
     i32.const 8
     i32.add
     local.set $1
     call $assembly/sim/behavior/rng/nextRand
     i32.const 10000
     i32.rem_s
     i32.const 400
     local.get $1
     local.get $1
     i32.const 400
     i32.gt_s
     select
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instBroken
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.const 1
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instRepairTicks
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      local.get $0
      call $assembly/sim/behavior/employeeBehavior/calcRepairTicks
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/countActiveInstances (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $2
    i32.store
    local.get $1
    i32.const 1
    i32.add
    local.get $1
    local.get $0
    local.get $2
    i32.add
    i32.load8_u
    i32.const 1
    i32.eq
    select
    local.set $1
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/sim/visitors/visitors/getAvgSatisfaction (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $assembly/sim/state/visitorState/activeVisitors
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  loop $for-loop|0
   local.get $1
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $3
    i32.store
    local.get $1
    local.get $3
    i32.add
    i32.load8_u
    i32.const 255
    i32.ne
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $3
     i32.store
     local.get $2
     local.get $3
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.add
     local.set $2
     local.get $0
     i32.const 1
     i32.add
     local.set $0
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  local.get $0
  i32.const 0
  i32.gt_s
  if (result i32)
   local.get $2
   local.get $0
   i32.div_s
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/spawnVisitor
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $folding-inner0
   global.get $assembly/sim/state/visitorState/activeVisitors
   i32.const 100
   i32.ge_s
   br_if $folding-inner0
   call $assembly/sim/attractions/attractions/countActiveInstances
   i32.eqz
   br_if $folding-inner0
   loop $for-loop|0
    local.get $0
    i32.const 100
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 255
     i32.eq
     if
      local.get $0
      call $assembly/sim/visitors/visitors/resetVisitor
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vX
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 25
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vY
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 49
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vLevel
      local.tee $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/heightData
      local.tee $2
      i32.store offset=4
      local.get $0
      local.get $1
      i32.add
      local.get $2
      i32.const 2475
      i32.add
      i32.load8_u
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.const 0
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTimer
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      call $assembly/sim/behavior/rng/nextRand
      i32.const 1000
      i32.rem_s
      global.get $assembly/sim/state/parkState/criminalRatePerThousand
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vCriminal
       local.tee $1
       i32.store
       local.get $0
       local.get $1
       i32.add
       i32.const 1
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vCrimeTimer
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const 180
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vCrimeCooldown
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       call $assembly/sim/behavior/rng/nextRand
       i32.const 4
       i32.rem_s
       i32.const 3
       i32.add
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      global.get $assembly/sim/state/visitorState/activeVisitors
      i32.const 1
      i32.add
      global.set $assembly/sim/state/visitorState/activeVisitors
      br $folding-inner0
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/visitors/visitors/countNearbyVisitors (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vX
  local.tee $3
  i32.store
  local.get $3
  local.get $0
  i32.const 2
  i32.shl
  local.tee $3
  i32.add
  i32.load
  local.set $5
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vY
  local.tee $4
  i32.store
  local.get $3
  local.get $4
  i32.add
  i32.load
  local.set $6
  loop $for-loop|0
   local.get $1
   i32.const 100
   i32.lt_s
   if
    block $for-continue|0
     local.get $0
     local.get $1
     i32.eq
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $3
     i32.store
     local.get $1
     local.get $3
     i32.add
     i32.load8_u
     local.tee $3
     i32.const 4
     i32.eq
     local.get $3
     i32.const 255
     i32.eq
     i32.or
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vX
     local.tee $3
     i32.store
     local.get $3
     local.get $1
     i32.const 2
     i32.shl
     local.tee $7
     i32.add
     i32.load
     local.get $5
     i32.sub
     local.tee $8
     i32.const 31
     i32.shr_s
     local.set $4
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vY
     local.tee $3
     i32.store
     local.get $2
     i32.const 1
     i32.add
     local.get $2
     local.get $4
     local.get $8
     i32.add
     local.get $4
     i32.xor
     local.get $3
     local.get $7
     i32.add
     i32.load
     local.get $6
     i32.sub
     local.tee $2
     i32.const 31
     i32.shr_s
     local.tee $3
     local.get $2
     i32.add
     local.get $3
     i32.xor
     i32.add
     i32.const 2
     i32.le_s
     select
     local.set $2
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/sim/visitors/visitors/maybeComplainCrowding (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vCrowdComplaintCooldown
  local.tee $1
  i32.store
  block $folding-inner0
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.tee $1
   i32.const 0
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vCrowdComplaintCooldown
    local.tee $2
    i32.store
    local.get $2
    local.get $0
    local.get $1
    i32.const 1
    i32.sub
    call $~lib/staticarray/StaticArray<i32>#__uset
    br $folding-inner0
   end
   local.get $0
   call $assembly/sim/visitors/visitors/countNearbyVisitors
   i32.const 5
   i32.lt_s
   br_if $folding-inner0
   call $assembly/sim/behavior/rng/nextRand
   i32.const 100
   i32.rem_s
   i32.const 35
   i32.ge_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vSatisfaction
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vSatisfaction
   local.tee $2
   i32.store offset=4
   local.get $1
   local.get $0
   local.get $2
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
   i32.const 2
   i32.sub
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.ge_s
   select
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $assembly/sim/state/parkState/parkAttractiveness
   i32.const 2
   i32.sub
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.ge_s
   select
   global.set $assembly/sim/state/parkState/parkAttractiveness
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vCrowdComplaintCooldown
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 75
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/behavior/navigation/findNearestWalkableTile (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const -1
  local.set $5
  i32.const 1073741824
  local.set $2
  loop $for-loop|0
   local.get $4
   i32.const 50
   i32.lt_s
   if
    i32.const 0
    local.set $3
    loop $for-loop|1
     local.get $3
     i32.const 50
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/gridData
      local.tee $6
      i32.store
      local.get $4
      i32.const 50
      i32.mul
      local.get $3
      i32.add
      local.get $6
      i32.add
      i32.load8_u
      local.tee $6
      call $assembly/sim/behavior/navigation/isWalkable
      i32.eqz
      local.get $6
      i32.const 9
      i32.ne
      i32.and
      i32.eqz
      if
       local.get $3
       local.get $0
       i32.sub
       local.tee $6
       i32.const 31
       i32.shr_s
       local.tee $7
       local.get $6
       local.get $7
       i32.add
       i32.xor
       local.get $4
       local.get $1
       i32.sub
       local.tee $6
       i32.const 31
       i32.shr_s
       local.tee $7
       local.get $6
       local.get $7
       i32.add
       i32.xor
       i32.add
       local.tee $6
       local.get $2
       i32.lt_s
       if
        local.get $3
        local.get $4
        i32.const 16
        i32.shl
        i32.or
        local.set $5
        local.get $6
        local.set $2
       end
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|1
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $5
 )
 (func $assembly/sim/visitors/visitors/tryPukeAt (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/gridData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.tee $0
  local.get $2
  i32.add
  i32.load8_u
  local.tee $1
  call $assembly/sim/grid/gridOps/isPathTile
  i32.eqz
  local.get $1
  i32.const 2
  i32.ne
  i32.and
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/parkState/pukeData
  local.tee $1
  i32.store
  local.get $0
  local.get $1
  i32.add
  i32.load8_u
  i32.const 1
  i32.add
  local.set $1
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/parkState/pukeData
  local.tee $2
  i32.store
  local.get $0
  local.get $2
  i32.add
  i32.const 4
  local.get $1
  local.get $1
  i32.const 4
  i32.gt_s
  select
  i32.store8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/visitors/visitors/pickTheftVictim (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vX
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $1
  i32.add
  i32.load
  local.set $5
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vY
  local.tee $3
  i32.store
  local.get $1
  local.get $3
  i32.add
  i32.load
  local.set $6
  i32.const -1
  local.set $1
  loop $for-loop|0
   local.get $4
   i32.const 100
   i32.lt_s
   if
    block $for-continue|0
     local.get $0
     local.get $4
     i32.eq
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $3
     i32.store
     local.get $3
     local.get $4
     i32.add
     i32.load8_u
     i32.const 255
     i32.eq
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vCriminal
     local.tee $3
     i32.store
     local.get $3
     local.get $4
     i32.add
     i32.load8_u
     i32.const 1
     i32.eq
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vX
     local.tee $3
     i32.store
     local.get $3
     local.get $4
     i32.const 2
     i32.shl
     local.tee $7
     i32.add
     i32.load
     local.get $5
     i32.sub
     local.tee $8
     i32.const 31
     i32.shr_s
     local.set $9
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vY
     local.tee $3
     i32.store
     local.get $8
     local.get $9
     i32.add
     local.get $9
     i32.xor
     local.get $3
     local.get $7
     i32.add
     i32.load
     local.get $6
     i32.sub
     local.tee $3
     i32.const 31
     i32.shr_s
     local.tee $8
     local.get $3
     local.get $8
     i32.add
     i32.xor
     i32.add
     i32.const 1
     i32.gt_s
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vWallet
     local.tee $3
     i32.store
     local.get $3
     local.get $7
     i32.add
     i32.load
     local.tee $3
     i32.const 0
     i32.le_s
     br_if $for-continue|0
     local.get $2
     local.get $3
     i32.lt_s
     if
      local.get $3
      local.set $2
      local.get $4
      local.set $1
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/sim/visitors/visitors/applyCrimeShock (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $assembly/sim/state/parkState/parkAttractiveness
  i32.const 1
  i32.const 1
  local.get $2
  local.get $2
  i32.const 0
  i32.le_s
  select
  local.tee $3
  i32.const 2
  i32.div_s
  local.tee $2
  local.get $2
  i32.const 0
  i32.le_s
  select
  i32.sub
  local.tee $2
  i32.const 0
  local.get $2
  i32.const 0
  i32.ge_s
  select
  global.set $assembly/sim/state/parkState/parkAttractiveness
  i32.const 0
  local.set $2
  loop $for-loop|0
   local.get $2
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $4
    i32.store
    block $for-continue|0
     local.get $2
     local.get $4
     i32.add
     i32.load8_u
     i32.const 255
     i32.eq
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vX
     local.tee $4
     i32.store
     local.get $4
     local.get $2
     i32.const 2
     i32.shl
     local.tee $4
     i32.add
     i32.load
     local.get $0
     i32.sub
     local.tee $5
     i32.const 31
     i32.shr_s
     local.set $6
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vY
     local.tee $7
     i32.store
     local.get $5
     local.get $6
     i32.add
     local.get $6
     i32.xor
     local.get $4
     local.get $7
     i32.add
     i32.load
     local.get $1
     i32.sub
     local.tee $5
     i32.const 31
     i32.shr_s
     local.tee $6
     local.get $5
     local.get $6
     i32.add
     i32.xor
     i32.add
     local.tee $5
     i32.const 6
     i32.gt_s
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $7
     i32.store offset=4
     local.get $6
     local.get $2
     local.get $4
     local.get $7
     i32.add
     i32.load
     i32.const 1
     local.get $3
     local.get $5
     i32.const 1
     i32.shl
     i32.sub
     local.tee $4
     local.get $4
     i32.const 0
     i32.le_s
     select
     i32.sub
     local.tee $4
     i32.const 0
     local.get $4
     i32.const 0
     i32.ge_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/visitors/visitors/shouldLeave (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vSatisfaction
  local.tee $1
  i32.store
  block $folding-inner0
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   local.tee $1
   i32.add
   i32.load
   i32.const 5
   i32.le_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vWallet
   local.tee $2
   i32.store
   local.get $1
   local.get $2
   i32.add
   i32.load
   i32.const 0
   i32.le_s
   br_if $folding-inner0
   i32.const 3
   local.set $1
   loop $for-loop|0
    local.get $1
    i32.const 5
    i32.le_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $2
     i32.store
     local.get $2
     local.get $0
     i32.const 6
     i32.mul
     local.get $1
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 90
     i32.ge_s
     if
      i32.const 0
      local.set $3
      i32.const 0
      local.set $2
      loop $for-loop|1
       local.get $2
       global.get $assembly/sim/state/attractionState/instanceCount
       i32.lt_s
       if
        block $for-break1
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/attractionState/instActive
         local.tee $4
         i32.store
         local.get $2
         local.get $4
         i32.add
         i32.load8_u
         i32.const 1
         i32.eq
         if
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/attractionState/instTemplateId
          local.tee $4
          i32.store
          local.get $4
          local.get $2
          i32.const 2
          i32.shl
          i32.add
          i32.load
          local.set $5
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/attractionState/tmplCategory
          local.tee $4
          i32.store
          local.get $1
          local.get $4
          local.get $5
          i32.const 2
          i32.shl
          i32.add
          i32.load
          i32.eq
          if
           i32.const 1
           local.set $3
           br $for-break1
          end
         end
         local.get $2
         i32.const 1
         i32.add
         local.set $2
         br $for-loop|1
        end
       end
      end
      local.get $3
      i32.eqz
      br_if $folding-inner0
     end
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/visitors/visitors/pickBestInstance (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const -1
  local.set $4
  i32.const -999
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vWallet
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $14
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const -1
  local.set $1
  i32.const 69
  local.set $5
  i32.const 3
  local.set $6
  loop $for-loop|0
   local.get $6
   i32.const 5
   i32.le_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vNeeds
    local.tee $3
    i32.store
    local.get $3
    local.get $0
    i32.const 6
    i32.mul
    local.get $6
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $3
    local.get $5
    i32.gt_s
    if
     local.get $3
     local.set $5
     local.get $6
     local.set $1
    end
    local.get $6
    i32.const 1
    i32.add
    local.set $6
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vExcitement
  local.tee $3
  i32.store
  local.get $3
  local.get $0
  i32.const 2
  i32.shl
  local.tee $5
  i32.add
  i32.load
  local.set $13
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vExcitementTolerance
  local.tee $3
  i32.store
  local.get $3
  local.get $5
  i32.add
  i32.load
  local.set $15
  i32.const 0
  local.set $6
  loop $for-loop|00
   local.get $6
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $3
    i32.store
    block $for-continue|0
     local.get $3
     local.get $6
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instBroken
     local.tee $3
     i32.store
     local.get $3
     local.get $6
     i32.add
     i32.load8_u
     i32.const 1
     i32.eq
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instTemplateId
     local.tee $3
     i32.store
     local.get $3
     local.get $6
     i32.const 2
     i32.shl
     local.tee $12
     i32.add
     i32.load
     local.set $7
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instCapacity
     local.tee $3
     i32.store
     local.get $3
     local.get $12
     i32.add
     i32.load
     local.set $5
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instCurrentRiders
     local.tee $3
     i32.store
     local.get $5
     local.get $3
     local.get $12
     i32.add
     i32.load
     i32.le_s
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/tmplCategory
     local.tee $3
     i32.store
     local.get $3
     local.get $7
     i32.const 2
     i32.shl
     local.tee $5
     i32.add
     i32.load
     local.set $11
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instTicketPrice
     local.tee $3
     i32.store
     local.get $3
     local.get $12
     i32.add
     i32.load
     local.set $10
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instPopularity
     local.tee $3
     i32.store
     local.get $3
     local.get $12
     i32.add
     i32.load
     local.tee $3
     i32.const 0
     local.get $3
     i32.const 0
     i32.ge_s
     select
     local.set $9
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instQueueLength
     local.tee $3
     i32.store
     local.get $3
     local.get $12
     i32.add
     i32.load
     local.set $8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instEstimatedWaitTicks
     local.tee $3
     i32.store
     local.get $3
     local.get $12
     i32.add
     i32.load
     local.set $7
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/tmplRequiredExcitement
     local.tee $3
     i32.store
     local.get $11
     i32.eqz
     local.get $11
     i32.const 1
     i32.eq
     i32.or
     local.get $3
     local.get $5
     i32.add
     i32.load
     local.tee $5
     local.get $13
     i32.gt_s
     i32.and
     local.get $10
     local.get $14
     i32.gt_s
     i32.or
     br_if $for-continue|0
     local.get $1
     local.get $11
     i32.eq
     local.get $1
     i32.const 0
     i32.ge_s
     i32.and
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vNeeds
      local.tee $3
      i32.store
      local.get $3
      local.get $0
      i32.const 6
      i32.mul
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      i32.add
      i32.load
      i32.const 3
      i32.mul
      i32.const 500
      i32.add
      local.get $9
      i32.add
     else
      local.get $11
      i32.const 2
      i32.le_s
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vNeeds
       local.tee $3
       i32.store
       local.get $9
       local.get $3
       local.get $0
       i32.const 6
       i32.mul
       local.get $11
       i32.add
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 1
       i32.shl
       i32.add
       local.get $10
       i32.const 1
       i32.shl
       i32.sub
       local.tee $3
       local.get $13
       local.get $15
       i32.sub
       i32.const 1
       i32.shl
       i32.sub
       local.get $3
       local.get $11
       i32.const 2
       i32.eq
       local.get $13
       local.get $15
       i32.gt_s
       i32.and
       select
       local.set $3
       local.get $11
       i32.eqz
       local.get $11
       i32.const 1
       i32.eq
       i32.or
       local.get $5
       local.get $13
       i32.le_s
       i32.and
       if (result i32)
        local.get $3
        local.get $13
        local.get $5
        i32.sub
        i32.const 3
        i32.div_s
        i32.add
       else
        local.get $3
       end
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vNeeds
       local.tee $3
       i32.store
       local.get $3
       local.get $0
       i32.const 6
       i32.mul
       local.get $11
       i32.add
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 20
       i32.sub
       local.get $9
       i32.const 2
       i32.div_s
       i32.add
       local.get $10
       i32.sub
      end
     end
     local.get $7
     i32.const 8
     i32.div_s
     local.get $8
     i32.const 1
     i32.shl
     i32.add
     i32.sub
     i32.const 0
     global.get $assembly/sim/state/visitorState/tickCount
     local.get $0
     i32.const 37
     i32.mul
     local.get $6
     i32.const 13
     i32.mul
     i32.add
     i32.add
     local.tee $3
     local.get $3
     i32.const 13
     i32.shl
     i32.xor
     local.tee $3
     local.get $3
     i32.const 17
     i32.shr_s
     i32.xor
     local.tee $3
     local.get $3
     i32.const 5
     i32.shl
     i32.xor
     local.tee $3
     i32.sub
     local.get $3
     local.get $3
     i32.const 0
     i32.lt_s
     select
     i32.const 15
     i32.rem_s
     i32.add
     local.tee $3
     local.get $2
     i32.gt_s
     if
      local.get $6
      local.set $4
      local.get $3
      local.set $2
     end
    end
    local.get $6
    i32.const 1
    i32.add
    local.set $6
    br $for-loop|00
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $assembly/sim/behavior/navigation/isWalkableAtLevel (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   local.get $0
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 0
   i32.lt_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   local.get $2
   i32.const 0
   i32.lt_s
   local.get $2
   i32.const 9
   i32.ge_s
   i32.or
   i32.or
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $3
    i32.store
    local.get $2
    local.get $3
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.tee $3
    i32.add
    i32.load8_u
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $0
     i32.store
     local.get $0
     local.get $3
     i32.add
     i32.load8_u
     call $assembly/sim/behavior/navigation/isWalkable
     local.set $0
     br $folding-inner1
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $3
    i32.store
    local.get $0
    local.get $1
    local.get $2
    call $assembly/sim/behavior/navigation/nodeIndex
    local.get $3
    i32.add
    i32.load8_s
    i32.const 0
    i32.ge_s
    local.set $0
    br $folding-inner1
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/behavior/navigation/bfsPathLevel (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (result i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  loop $for-loop|0
   local.get $6
   i32.const 22500
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/pathfindingState/bfsVisited
    local.tee $8
    i32.store
    local.get $6
    local.get $8
    i32.add
    i32.const 0
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/pathfindingState/bfsDist
    local.tee $8
    i32.store
    local.get $8
    local.get $6
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/pathfindingState/bfsParent
    local.tee $8
    i32.store
    local.get $8
    local.get $6
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $6
    i32.const 1
    i32.add
    local.set $6
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/pathfindingState/bfsQueue
  local.tee $6
  i32.store
  local.get $6
  i32.const 0
  local.get $0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/pathfindingState/bfsQueue
  local.tee $6
  i32.store
  local.get $6
  i32.const 1
  local.get $1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/pathfindingState/bfsQueue
  local.tee $8
  i32.store
  i32.const 3
  local.set $6
  local.get $8
  i32.const 2
  local.get $2
  call $~lib/staticarray/StaticArray<i32>#__uset
  local.get $0
  local.get $1
  local.get $2
  call $assembly/sim/behavior/navigation/nodeIndex
  local.set $0
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/pathfindingState/bfsVisited
  local.tee $1
  i32.store
  local.get $0
  local.get $1
  i32.add
  i32.const 1
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/pathfindingState/bfsDist
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 6
  i32.const 2880
  call $~lib/rt/__newBuffer
  local.tee $10
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 6
  i32.const 2928
  call $~lib/rt/__newBuffer
  local.tee $0
  i32.store offset=8
  loop $while-continue|1
   local.get $6
   local.get $7
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/pathfindingState/bfsQueue
    local.tee $1
    i32.store
    local.get $1
    local.get $7
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $2
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/pathfindingState/bfsQueue
    local.tee $1
    i32.store
    local.get $7
    i32.const 1
    i32.add
    local.tee $7
    i32.const 1
    i32.add
    local.set $9
    local.get $1
    local.get $7
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/pathfindingState/bfsQueue
    local.tee $1
    i32.store
    local.get $9
    i32.const 1
    i32.add
    local.set $7
    local.get $2
    local.get $8
    local.get $1
    local.get $9
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $9
    call $assembly/sim/behavior/navigation/nodeIndex
    local.set $11
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/pathfindingState/bfsDist
    local.tee $1
    i32.store
    local.get $1
    local.get $11
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $12
    local.get $4
    local.get $8
    i32.eq
    local.get $2
    local.get $3
    i32.eq
    i32.and
    local.get $5
    local.get $9
    i32.eq
    i32.and
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $12
     return
    end
    i32.const 0
    local.set $1
    loop $for-loop|2
     local.get $1
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $10
      i32.store
      local.get $2
      local.get $10
      local.get $1
      i32.const 2
      i32.shl
      local.tee $13
      i32.add
      i32.load
      i32.add
      local.set $14
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      block $for-continue|2
       local.get $14
       local.get $8
       local.get $0
       local.get $13
       i32.add
       i32.load
       i32.add
       local.tee $13
       local.get $9
       call $assembly/sim/behavior/navigation/isWalkableAtLevel
       i32.eqz
       br_if $for-continue|2
       local.get $14
       local.get $13
       local.get $9
       call $assembly/sim/behavior/navigation/nodeIndex
       local.set $15
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/pathfindingState/bfsVisited
       local.tee $16
       i32.store
       local.get $15
       local.get $16
       i32.add
       i32.load8_u
       i32.const 1
       i32.eq
       br_if $for-continue|2
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/pathfindingState/bfsVisited
       local.tee $16
       i32.store
       local.get $15
       local.get $16
       i32.add
       i32.const 1
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/pathfindingState/bfsDist
       local.tee $16
       i32.store
       local.get $16
       local.get $15
       local.get $12
       i32.const 1
       i32.add
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/pathfindingState/bfsParent
       local.tee $16
       i32.store
       local.get $16
       local.get $15
       local.get $11
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/pathfindingState/bfsQueue
       local.tee $15
       i32.store
       local.get $15
       local.get $6
       local.get $14
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/pathfindingState/bfsQueue
       local.tee $14
       i32.store
       local.get $6
       i32.const 1
       i32.add
       local.tee $6
       i32.const 1
       i32.add
       local.set $15
       local.get $14
       local.get $6
       local.get $13
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/pathfindingState/bfsQueue
       local.tee $13
       i32.store
       local.get $15
       i32.const 1
       i32.add
       local.set $6
       local.get $13
       local.get $15
       local.get $9
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|2
     end
    end
    i32.const 1
    local.set $1
    block $__inlined_func$assembly/sim/behavior/navigation/canSwitchLevelAt$97
     local.get $9
     i32.const 0
     i32.gt_s
     if (result i32)
      local.get $2
      local.get $8
      local.get $9
      i32.const 1
      i32.sub
      call $assembly/sim/behavior/navigation/isWalkableAtLevel
     else
      i32.const 0
     end
     br_if $__inlined_func$assembly/sim/behavior/navigation/canSwitchLevelAt$97
     local.get $9
     i32.const 8
     i32.lt_s
     if (result i32)
      local.get $2
      local.get $8
      local.get $9
      i32.const 1
      i32.add
      call $assembly/sim/behavior/navigation/isWalkableAtLevel
     else
      i32.const 0
     end
     br_if $__inlined_func$assembly/sim/behavior/navigation/canSwitchLevelAt$97
     i32.const 0
     local.set $1
    end
    local.get $1
    if
     i32.const -1
     local.set $1
     loop $for-loop|3
      local.get $1
      i32.const 1
      i32.le_s
      if
       block $for-continue|3
        local.get $1
        local.get $9
        i32.add
        local.tee $13
        i32.const 0
        i32.lt_s
        local.get $13
        i32.const 9
        i32.ge_s
        i32.or
        br_if $for-continue|3
        local.get $2
        local.get $8
        local.get $13
        call $assembly/sim/behavior/navigation/isWalkableAtLevel
        i32.eqz
        br_if $for-continue|3
        local.get $2
        local.get $8
        local.get $13
        call $assembly/sim/behavior/navigation/nodeIndex
        local.set $14
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/pathfindingState/bfsVisited
        local.tee $15
        i32.store
        local.get $14
        local.get $15
        i32.add
        i32.load8_u
        i32.eqz
        if
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/pathfindingState/bfsVisited
         local.tee $15
         i32.store
         local.get $14
         local.get $15
         i32.add
         i32.const 1
         i32.store8
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/pathfindingState/bfsDist
         local.tee $15
         i32.store
         local.get $15
         local.get $14
         local.get $12
         i32.const 1
         i32.add
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/pathfindingState/bfsParent
         local.tee $15
         i32.store
         local.get $15
         local.get $14
         local.get $11
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/pathfindingState/bfsQueue
         local.tee $14
         i32.store
         local.get $14
         local.get $6
         local.get $2
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/pathfindingState/bfsQueue
         local.tee $14
         i32.store
         local.get $6
         i32.const 1
         i32.add
         local.tee $6
         i32.const 1
         i32.add
         local.set $15
         local.get $14
         local.get $6
         local.get $8
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/pathfindingState/bfsQueue
         local.tee $6
         i32.store
         local.get $6
         local.get $15
         local.get $13
         call $~lib/staticarray/StaticArray<i32>#__uset
         local.get $15
         i32.const 1
         i32.add
         local.set $6
        end
       end
       local.get $1
       i32.const 2
       i32.add
       local.set $1
       br $for-loop|3
      end
     end
    end
    br $while-continue|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/behavior/navigation/bfsNextStepLevel (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   local.get $5
   call $assembly/sim/behavior/navigation/bfsPathLevel
   i32.const 0
   i32.le_s
   br_if $folding-inner0
   local.get $3
   local.get $4
   local.get $5
   call $assembly/sim/behavior/navigation/nodeIndex
   local.set $3
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/behavior/navigation/nodeIndex
   local.set $1
   loop $while-continue|0
    block $while-break|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/pathfindingState/bfsParent
     local.tee $0
     i32.store
     local.get $1
     local.get $0
     local.get $3
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $0
     i32.eq
     br_if $while-break|0
     local.get $0
     i32.const 0
     i32.lt_s
     br_if $folding-inner0
     local.get $0
     local.set $3
     br $while-continue|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   i32.const 2500
   i32.rem_s
   local.tee $0
   i32.const 50
   i32.rem_s
   local.get $0
   i32.const 50
   i32.div_s
   i32.const 10
   i32.shl
   i32.or
   local.get $3
   i32.const 2500
   i32.div_s
   i32.const 20
   i32.shl
   i32.or
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/visitors/visitors/pickRandomPathGoal (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $3
   i32.const 20
   i32.lt_s
   if
    i32.const 49
    local.get $0
    call $assembly/sim/behavior/rng/nextRand
    i32.const 21
    i32.rem_s
    i32.add
    i32.const 10
    i32.sub
    local.tee $4
    local.get $4
    i32.const 49
    i32.gt_s
    select
    local.tee $4
    i32.const 0
    local.get $4
    i32.const 0
    i32.ge_s
    select
    local.tee $4
    i32.const 49
    local.get $1
    call $assembly/sim/behavior/rng/nextRand
    i32.const 21
    i32.rem_s
    i32.add
    i32.const 10
    i32.sub
    local.tee $5
    local.get $5
    i32.const 49
    i32.gt_s
    select
    local.tee $5
    i32.const 0
    local.get $5
    i32.const 0
    i32.ge_s
    select
    local.tee $5
    i32.const 50
    i32.mul
    i32.add
    local.set $6
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $7
    i32.store
    local.get $6
    local.get $7
    i32.add
    i32.load8_u
    call $assembly/sim/behavior/navigation/isWalkable
    i32.eqz
    local.get $1
    local.get $5
    i32.eq
    local.get $0
    local.get $4
    i32.eq
    i32.and
    i32.or
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/heightData
     local.tee $7
     i32.store
     local.get $0
     local.get $1
     local.get $2
     local.get $4
     local.get $5
     local.get $6
     local.get $7
     i32.add
     i32.load8_u
     call $assembly/sim/behavior/navigation/bfsNextStepLevel
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      local.get $4
      local.get $5
      i32.const 16
      i32.shl
      i32.or
      return
     end
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/behavior/navigation/randomRoamStepLevel (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (result i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 6
  i32.const 2976
  call $~lib/rt/__newBuffer
  local.tee $7
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 6
  i32.const 3024
  call $~lib/rt/__newBuffer
  local.tee $8
  i32.store offset=4
  local.get $3
  local.get $0
  i32.sub
  local.tee $5
  i32.const 31
  i32.shr_s
  local.tee $9
  local.get $5
  local.get $9
  i32.add
  i32.xor
  local.get $4
  local.get $1
  i32.sub
  local.tee $5
  i32.const 31
  i32.shr_s
  local.tee $9
  local.get $5
  local.get $9
  i32.add
  i32.xor
  i32.add
  local.set $10
  i32.const -1
  local.set $9
  i32.const -1073741824
  local.set $5
  loop $for-loop|0
   local.get $6
   i32.const 4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $7
    i32.store offset=8
    local.get $0
    local.get $7
    local.get $6
    i32.const 2
    i32.shl
    local.tee $12
    i32.add
    i32.load
    i32.add
    local.set $11
    global.get $~lib/memory/__stack_pointer
    local.get $8
    i32.store offset=8
    local.get $11
    local.get $1
    local.get $8
    local.get $12
    i32.add
    i32.load
    i32.add
    local.tee $12
    local.get $2
    call $assembly/sim/behavior/navigation/isWalkableAtLevel
    if
     local.get $10
     local.get $3
     local.get $11
     i32.sub
     local.tee $13
     i32.const 31
     i32.shr_s
     local.tee $14
     local.get $13
     local.get $14
     i32.add
     i32.xor
     local.get $4
     local.get $12
     i32.sub
     local.tee $13
     i32.const 31
     i32.shr_s
     local.tee $14
     local.get $13
     local.get $14
     i32.add
     i32.xor
     i32.add
     i32.sub
     i32.const 12
     i32.mul
     call $assembly/sim/behavior/rng/nextRand
     i32.const 100
     i32.rem_s
     i32.add
     local.tee $13
     local.get $5
     i32.gt_s
     if
      local.get $11
      local.get $12
      i32.const 10
      i32.shl
      i32.or
      local.get $2
      i32.const 20
      i32.shl
      i32.or
      local.set $9
      local.get $13
      local.set $5
     end
    end
    local.get $6
    i32.const 1
    i32.add
    local.set $6
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $9
 )
 (func $assembly/sim/behavior/employeeBehavior/findAdjacentPath (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instX
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $1
  i32.add
  i32.load
  local.set $3
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instY
  local.tee $2
  i32.store
  local.get $1
  local.get $2
  i32.add
  i32.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $4
  i32.store
  local.get $1
  local.get $4
  i32.add
  i32.load
  local.set $4
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instRotation
  local.tee $5
  i32.store
  block $__inlined_func$assembly/sim/behavior/employeeBehavior/instFootprintW$100
   local.get $1
   local.get $5
   i32.add
   i32.load
   local.tee $1
   i32.const 270
   i32.eq
   local.get $1
   i32.const 90
   i32.eq
   i32.or
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/tmplFootprintH
    local.tee $1
    i32.store
    br $__inlined_func$assembly/sim/behavior/employeeBehavior/instFootprintW$100
   end
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplFootprintW
   local.tee $1
   i32.store
  end
  local.get $1
  local.get $4
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $6
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $0
  i32.add
  i32.load
  local.set $1
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instRotation
  local.tee $4
  i32.store
  block $__inlined_func$assembly/sim/behavior/employeeBehavior/instFootprintH$101
   local.get $0
   local.get $4
   i32.add
   i32.load
   local.tee $0
   i32.const 270
   i32.eq
   local.get $0
   i32.const 90
   i32.eq
   i32.or
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/tmplFootprintW
    local.tee $0
    i32.store
    br $__inlined_func$assembly/sim/behavior/employeeBehavior/instFootprintH$101
   end
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplFootprintH
   local.tee $0
   i32.store
  end
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $7
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
  local.set $0
  block $folding-inner0
   loop $for-loop|0
    local.get $0
    local.get $6
    i32.le_s
    if
     i32.const -1
     local.set $5
     loop $for-loop|1
      local.get $5
      local.get $7
      i32.le_s
      if
       block $for-continue|1
        local.get $0
        local.get $6
        i32.lt_s
        local.get $0
        i32.const 0
        i32.ge_s
        i32.and
        local.get $5
        i32.const 0
        i32.ge_s
        i32.and
        local.get $5
        local.get $7
        i32.lt_s
        i32.and
        br_if $for-continue|1
        local.get $0
        local.get $3
        i32.add
        local.tee $4
        i32.const 0
        i32.lt_s
        local.get $4
        i32.const 50
        i32.ge_s
        i32.or
        local.get $2
        local.get $5
        i32.add
        local.tee $1
        i32.const 0
        i32.lt_s
        i32.or
        local.get $1
        i32.const 50
        i32.ge_s
        i32.or
        br_if $for-continue|1
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/gridState/gridData
        local.tee $8
        i32.store
        local.get $1
        i32.const 50
        i32.mul
        local.get $4
        i32.add
        local.get $8
        i32.add
        i32.load8_u
        i32.const 4
        i32.eq
        br_if $folding-inner0
       end
       local.get $5
       i32.const 1
       i32.add
       local.set $5
       br $for-loop|1
      end
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   i32.const -1
   local.set $0
   loop $for-loop|2
    local.get $0
    local.get $6
    i32.le_s
    if
     i32.const -1
     local.set $5
     loop $for-loop|3
      local.get $5
      local.get $7
      i32.le_s
      if
       block $for-continue|3
        local.get $0
        local.get $6
        i32.lt_s
        local.get $0
        i32.const 0
        i32.ge_s
        i32.and
        local.get $5
        i32.const 0
        i32.ge_s
        i32.and
        local.get $5
        local.get $7
        i32.lt_s
        i32.and
        br_if $for-continue|3
        local.get $0
        local.get $3
        i32.add
        local.tee $4
        i32.const 0
        i32.lt_s
        local.get $4
        i32.const 50
        i32.ge_s
        i32.or
        local.get $2
        local.get $5
        i32.add
        local.tee $1
        i32.const 0
        i32.lt_s
        i32.or
        local.get $1
        i32.const 50
        i32.ge_s
        i32.or
        br_if $for-continue|3
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/gridState/gridData
        local.tee $8
        i32.store
        local.get $1
        i32.const 50
        i32.mul
        local.get $4
        i32.add
        local.get $8
        i32.add
        i32.load8_u
        call $assembly/sim/behavior/navigation/isWalkable
        br_if $folding-inner0
       end
       local.get $5
       i32.const 1
       i32.add
       local.set $5
       br $for-loop|3
      end
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|2
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
  local.get $1
  i32.const 16
  i32.shl
  i32.or
 )
 (func $assembly/sim/visitors/visitors/resolveApproachTile (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $1
  local.get $2
  call $assembly/sim/attractions/attractions/isInstantServiceCategory
  if
   local.get $0
   call $assembly/sim/behavior/employeeBehavior/findAdjacentPath
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instEntranceX
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $1
  i32.add
  i32.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instEntranceY
  local.tee $3
  i32.store
  local.get $2
  i32.const 50
  i32.lt_s
  local.get $2
  i32.const 0
  i32.ge_s
  i32.and
  local.get $1
  local.get $3
  i32.add
  i32.load
  local.tee $1
  i32.const 0
  i32.ge_s
  i32.and
  local.get $1
  i32.const 50
  i32.lt_s
  i32.and
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $3
   i32.store
   i32.const 1
   local.get $1
   i32.const 50
   i32.mul
   local.get $2
   i32.add
   local.get $3
   i32.add
   i32.load8_u
   local.tee $3
   i32.const 4
   i32.eq
   i32.const 1
   local.get $3
   i32.const 9
   i32.eq
   local.get $3
   call $assembly/sim/behavior/navigation/isWalkable
   select
   select
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $2
    local.get $1
    i32.const 16
    i32.shl
    i32.or
    return
   end
  end
  local.get $0
  call $assembly/sim/behavior/employeeBehavior/findAdjacentPath
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/recordAttractionVisitAndRevenue (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 128
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTotalVisitors
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTotalVisitors
  local.tee $3
  i32.store offset=4
  local.get $2
  local.get $0
  local.get $3
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  i32.const 1
  i32.add
  call $~lib/staticarray/StaticArray<i32>#__uset
  local.get $1
  i32.const 0
  i32.le_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTotalRevenue
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTotalRevenue
  local.tee $3
  i32.store offset=4
  local.get $2
  local.get $0
  local.get $1
  local.get $3
  local.get $0
  i32.const 2
  i32.shl
  local.tee $3
  i32.add
  i32.load
  i32.add
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instMonthlyRevenue
  local.tee $4
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instMonthlyRevenue
  local.tee $2
  i32.store offset=4
  local.get $4
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  i32.add
  i32.load
  i32.add
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<i32>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   i32.const 1360
   i32.const 3136
   i32.const 114
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getQueueFrontTile (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instEntranceX
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.tee $3
  i32.add
  i32.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instEntranceY
  local.tee $4
  i32.store
  local.get $2
  i32.const 50
  i32.lt_s
  local.get $2
  i32.const 0
  i32.ge_s
  i32.and
  local.get $3
  local.get $4
  i32.add
  i32.load
  local.tee $3
  i32.const 0
  i32.ge_s
  i32.and
  local.get $3
  i32.const 50
  i32.lt_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $4
   i32.store
   local.get $3
   i32.const 50
   i32.mul
   local.get $2
   i32.add
   local.get $4
   i32.add
   i32.load8_u
   i32.const 4
   i32.eq
  else
   i32.const 0
  end
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   local.get $3
   i32.const 16
   i32.shl
   i32.or
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 3072
  call $~lib/rt/__newArray
  local.tee $4
  i32.store offset=4
  loop $for-loop|0
   local.get $1
   i32.const 4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store
    local.get $4
    local.get $1
    i32.const 1
    i32.shl
    local.tee $5
    call $~lib/array/Array<i32>#__get
    local.get $2
    i32.add
    local.set $6
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store
    local.get $6
    i32.const 0
    i32.lt_s
    local.get $6
    i32.const 50
    i32.ge_s
    i32.or
    local.get $4
    local.get $5
    i32.const 1
    i32.add
    call $~lib/array/Array<i32>#__get
    local.get $3
    i32.add
    local.tee $5
    i32.const 0
    i32.lt_s
    i32.or
    local.get $5
    i32.const 50
    i32.ge_s
    i32.or
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $7
     i32.store
     local.get $5
     i32.const 50
     i32.mul
     local.get $6
     i32.add
     local.get $7
     i32.add
     i32.load8_u
     i32.const 4
     i32.eq
     if
      global.get $~lib/memory/__stack_pointer
      i32.const 8
      i32.add
      global.set $~lib/memory/__stack_pointer
      local.get $6
      local.get $5
      i32.const 16
      i32.shl
      i32.or
      return
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  local.get $0
  call $assembly/sim/behavior/employeeBehavior/findAdjacentPath
  local.tee $0
  i32.const 0
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/gridData
  local.tee $1
  i32.store
  local.get $0
  i32.const 16
  i32.shr_s
  i32.const 65535
  i32.and
  i32.const 50
  i32.mul
  local.get $0
  i32.const 65535
  i32.and
  i32.add
  local.get $1
  i32.add
  i32.load8_u
  i32.const 4
  i32.eq
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/visitors/visitors/findQueueSpotByPosition (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 40
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 40
  memory.fill
  block $folding-inner0
   local.get $0
   call $assembly/sim/visitors/visitors/getQueueFrontTile
   local.tee $0
   i32.const 0
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 96
   call $~lib/staticarray/StaticArray<i32>#constructor
   local.tee $8
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 96
   call $~lib/staticarray/StaticArray<i32>#constructor
   local.tee $9
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 96
   call $~lib/staticarray/StaticArray<i32>#constructor
   local.tee $10
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 96
   call $~lib/staticarray/StaticArray<i32>#constructor
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 2500
   call $~lib/staticarray/StaticArray<u8>#constructor
   local.tee $11
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   i32.const 96
   call $~lib/staticarray/StaticArray<i32>#constructor
   local.tee $3
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   i32.const 96
   call $~lib/staticarray/StaticArray<i32>#constructor
   local.tee $4
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 96
   call $~lib/staticarray/StaticArray<i32>#constructor
   local.tee $5
   i32.store offset=28
   global.get $~lib/memory/__stack_pointer
   local.get $8
   i32.store offset=32
   local.get $8
   i32.const 0
   local.get $0
   i32.const 65535
   i32.and
   local.tee $2
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store offset=32
   local.get $9
   i32.const 0
   local.get $0
   i32.const 16
   i32.shr_s
   i32.const 65535
   i32.and
   local.tee $0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   local.get $10
   i32.store offset=32
   local.get $10
   i32.const 0
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   local.get $11
   i32.store offset=32
   local.get $0
   i32.const 50
   i32.mul
   local.get $2
   i32.add
   local.get $11
   i32.add
   i32.const 1
   i32.store8
   i32.const 1
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 3184
   call $~lib/rt/__newArray
   local.tee $12
   i32.store offset=36
   loop $while-continue|0
    local.get $6
    i32.const 96
    i32.lt_s
    local.get $0
    local.get $7
    i32.gt_s
    i32.and
    if
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.store offset=32
     local.get $8
     local.get $7
     i32.const 2
     i32.shl
     local.tee $2
     i32.add
     i32.load
     local.set $15
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=32
     local.get $2
     local.get $9
     i32.add
     i32.load
     local.set $16
     global.get $~lib/memory/__stack_pointer
     local.get $10
     i32.store offset=32
     local.get $2
     local.get $10
     i32.add
     i32.load
     local.set $17
     local.get $7
     i32.const 1
     i32.add
     local.set $7
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=32
     local.get $3
     local.get $6
     local.get $15
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=32
     local.get $4
     local.get $6
     local.get $16
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=32
     local.get $5
     local.get $6
     local.get $17
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $6
     i32.const 1
     i32.add
     local.set $6
     i32.const 0
     local.set $2
     loop $for-loop|1
      local.get $2
      i32.const 4
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $12
       i32.store offset=32
       local.get $12
       local.get $2
       i32.const 1
       i32.shl
       local.tee $14
       call $~lib/array/Array<i32>#__get
       local.get $15
       i32.add
       local.set $13
       global.get $~lib/memory/__stack_pointer
       local.get $12
       i32.store offset=32
       block $for-continue|1
        local.get $13
        i32.const 0
        i32.lt_s
        local.get $13
        i32.const 50
        i32.ge_s
        i32.or
        local.get $12
        local.get $14
        i32.const 1
        i32.add
        call $~lib/array/Array<i32>#__get
        local.get $16
        i32.add
        local.tee $14
        i32.const 0
        i32.lt_s
        i32.or
        local.get $14
        i32.const 50
        i32.ge_s
        i32.or
        br_if $for-continue|1
        global.get $~lib/memory/__stack_pointer
        local.get $11
        i32.store offset=32
        local.get $14
        i32.const 50
        i32.mul
        local.get $13
        i32.add
        local.tee $18
        local.get $11
        i32.add
        local.tee $19
        i32.load8_u
        i32.const 1
        i32.eq
        br_if $for-continue|1
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/gridState/gridData
        local.tee $20
        i32.store offset=32
        local.get $18
        local.get $20
        i32.add
        i32.load8_u
        i32.const 4
        i32.ne
        local.get $0
        i32.const 96
        i32.ge_s
        i32.or
        br_if $for-continue|1
        global.get $~lib/memory/__stack_pointer
        local.get $11
        i32.store offset=32
        local.get $19
        i32.const 1
        i32.store8
        global.get $~lib/memory/__stack_pointer
        local.get $8
        i32.store offset=32
        local.get $8
        local.get $0
        local.get $13
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.store offset=32
        local.get $9
        local.get $0
        local.get $14
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store offset=32
        local.get $10
        local.get $0
        local.get $17
        i32.const 1
        i32.add
        call $~lib/staticarray/StaticArray<i32>#__uset
        local.get $0
        i32.const 1
        i32.add
        local.set $0
       end
       local.get $2
       i32.const 1
       i32.add
       local.set $2
       br $for-loop|1
      end
     end
     br $while-continue|0
    end
   end
   i32.const 1
   local.set $2
   loop $for-loop|2
    local.get $2
    local.get $6
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=32
     local.get $3
     local.get $2
     i32.const 2
     i32.shl
     local.tee $0
     i32.add
     i32.load
     local.set $7
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=32
     local.get $0
     local.get $4
     i32.add
     i32.load
     local.set $8
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=32
     local.get $0
     local.get $5
     i32.add
     i32.load
     local.set $9
     local.get $2
     i32.const 1
     i32.sub
     local.set $0
     loop $while-continue|3
      local.get $0
      i32.const 0
      i32.ge_s
      if
       block $while-break|3
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store offset=32
        local.get $5
        local.get $0
        i32.const 2
        i32.shl
        local.tee $10
        i32.add
        i32.load
        local.set $11
        global.get $~lib/memory/__stack_pointer
        local.get $3
        i32.store offset=32
        local.get $3
        local.get $10
        i32.add
        i32.load
        local.set $12
        global.get $~lib/memory/__stack_pointer
        local.get $4
        i32.store offset=32
        local.get $4
        local.get $10
        i32.add
        i32.load
        local.tee $10
        local.get $8
        i32.eq
        local.get $7
        local.get $12
        i32.ge_s
        i32.and
        local.get $8
        local.get $10
        i32.gt_s
        i32.or
        local.get $9
        local.get $11
        i32.eq
        i32.and
        local.get $9
        local.get $11
        i32.gt_s
        i32.or
        br_if $while-break|3
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store offset=32
        local.get $5
        local.get $0
        i32.const 1
        i32.add
        local.tee $13
        local.get $11
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        local.get $3
        i32.store offset=32
        local.get $3
        local.get $13
        local.get $12
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        local.get $4
        i32.store offset=32
        local.get $4
        local.get $13
        local.get $10
        call $~lib/staticarray/StaticArray<i32>#__uset
        local.get $0
        i32.const 1
        i32.sub
        local.set $0
        br $while-continue|3
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=32
     local.get $5
     local.get $0
     i32.const 1
     i32.add
     local.tee $0
     local.get $9
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=32
     local.get $3
     local.get $0
     local.get $7
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=32
     local.get $4
     local.get $0
     local.get $8
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|2
    end
   end
   local.get $6
   i32.const 0
   i32.le_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=32
   local.get $3
   local.get $6
   i32.const 1
   i32.sub
   local.tee $0
   local.get $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.ge_s
   select
   local.tee $1
   local.get $0
   local.get $1
   i32.lt_s
   select
   i32.const 2
   i32.shl
   local.tee $0
   i32.add
   i32.load
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=32
   local.get $1
   local.get $0
   local.get $4
   i32.add
   i32.load
   i32.const 16
   i32.shl
   i32.or
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 40
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 40
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/visitors/visitors/getQueuePosition (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vQueueOrder
  local.tee $4
  i32.store
  local.get $4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $5
  loop $for-loop|0
   local.get $2
   i32.const 100
   i32.lt_s
   if
    block $for-continue|0
     local.get $1
     local.get $2
     i32.eq
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $4
     i32.store
     local.get $2
     local.get $4
     i32.add
     i32.load8_u
     i32.const 2
     i32.ne
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $4
     i32.store
     local.get $0
     local.get $4
     local.get $2
     i32.const 2
     i32.shl
     local.tee $6
     i32.add
     i32.load
     i32.ne
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueOrder
     local.tee $4
     i32.store
     local.get $3
     i32.const 1
     i32.add
     local.get $3
     local.get $4
     local.get $6
     i32.add
     i32.load
     local.tee $3
     local.get $5
     i32.eq
     local.get $1
     local.get $2
     i32.gt_s
     i32.and
     local.get $3
     local.get $5
     i32.lt_s
     i32.or
     select
     local.set $3
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $assembly/sim/visitors/visitors/updateVisitor (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vState
  local.tee $1
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
   local.tee $1
   i32.const 255
   i32.eq
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vBalloonTimer
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.tee $3
   i32.const 0
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vBalloonTimer
    local.tee $4
    i32.store
    local.get $4
    local.get $0
    local.get $3
    i32.const 1
    i32.sub
    call $~lib/staticarray/StaticArray<i32>#__uset
   end
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vUmbrellaTimer
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.tee $3
   i32.const 0
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vUmbrellaTimer
    local.tee $4
    i32.store
    local.get $4
    local.get $0
    local.get $3
    i32.const 1
    i32.sub
    call $~lib/staticarray/StaticArray<i32>#__uset
   end
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vPukeTimer
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   i32.const 2
   i32.shl
   local.tee $3
   i32.add
   i32.load
   i32.const 0
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vPukeTimer
    local.tee $4
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vPukeTimer
    local.tee $5
    i32.store offset=4
    local.get $4
    local.get $0
    local.get $3
    local.get $5
    i32.add
    i32.load
    i32.const 1
    i32.sub
    call $~lib/staticarray/StaticArray<i32>#__uset
   end
   local.get $1
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vPaid
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.load8_u
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vWallet
     local.tee $1
     i32.store
     global.get $assembly/sim/state/parkState/entranceTicket
     local.get $1
     local.get $0
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     i32.load
     i32.le_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vWallet
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vWallet
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $0
      local.get $1
      local.get $3
      i32.add
      i32.load
      global.get $assembly/sim/state/parkState/entranceTicket
      i32.sub
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $assembly/sim/state/parkState/entranceTicket
      call $assembly/sim/economy/economy/earn
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vPaid
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.const 1
      i32.store8
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.const 4
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTimer
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 10
      call $~lib/staticarray/StaticArray<i32>#__uset
      br $folding-inner0
     end
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.const 1
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTimer
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTarget
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    br $folding-inner0
   end
   local.get $1
   i32.const 1
   i32.eq
   if
    local.get $0
    call $assembly/sim/visitors/visitors/maybeComplainCrowding
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vX
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const 2
    i32.shl
    local.tee $1
    i32.add
    i32.load
    local.set $2
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vY
    local.tee $3
    i32.store
    local.get $2
    i32.const 50
    i32.lt_s
    local.get $2
    i32.const 0
    i32.ge_s
    i32.and
    local.get $1
    local.get $3
    i32.add
    i32.load
    local.tee $3
    i32.const 0
    i32.ge_s
    i32.and
    local.get $3
    i32.const 50
    i32.lt_s
    i32.and
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $1
     i32.store
     local.get $3
     i32.const 50
     i32.mul
     local.get $2
     i32.add
     local.get $1
     i32.add
     i32.load8_u
     call $assembly/sim/behavior/navigation/isWalkable
     i32.eqz
     if
      local.get $2
      local.get $3
      call $assembly/sim/behavior/navigation/findNearestWalkableTile
      local.tee $1
      i32.const 0
      i32.ge_s
      if
       local.get $1
       i32.const 65535
       i32.and
       local.tee $4
       local.get $2
       i32.sub
       local.tee $5
       i32.const 31
       i32.shr_s
       local.tee $6
       local.get $5
       local.get $6
       i32.add
       i32.xor
       local.get $1
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       local.tee $1
       local.get $3
       i32.sub
       local.tee $5
       i32.const 31
       i32.shr_s
       local.tee $6
       local.get $5
       local.get $6
       i32.add
       i32.xor
       i32.ge_s
       if
        local.get $2
        local.get $4
        i32.lt_s
        if
         local.get $2
         i32.const 1
         i32.add
         local.set $2
        else
         local.get $2
         local.get $4
         i32.gt_s
         if
          local.get $2
          i32.const 1
          i32.sub
          local.set $2
         else
          local.get $3
          i32.const 1
          i32.add
          local.get $3
          i32.const 1
          i32.sub
          local.get $3
          local.get $1
          local.get $3
          i32.lt_s
          select
          local.get $1
          local.get $3
          i32.gt_s
          select
          local.set $3
         end
        end
       else
        local.get $1
        local.get $3
        i32.gt_s
        if
         local.get $3
         i32.const 1
         i32.add
         local.set $3
        else
         local.get $1
         local.get $3
         i32.lt_s
         if
          local.get $3
          i32.const 1
          i32.sub
          local.set $3
         else
          local.get $2
          i32.const 1
          i32.add
          local.get $2
          i32.const 1
          i32.sub
          local.get $2
          local.get $2
          local.get $4
          i32.gt_s
          select
          local.get $2
          local.get $4
          i32.lt_s
          select
          local.set $2
         end
        end
       end
       local.get $2
       i32.const 50
       i32.lt_s
       local.get $2
       i32.const 0
       i32.ge_s
       i32.and
       local.get $3
       i32.const 0
       i32.ge_s
       i32.and
       local.get $3
       i32.const 50
       i32.lt_s
       i32.and
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vX
        local.tee $1
        i32.store
        local.get $1
        local.get $0
        local.get $2
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vY
        local.tee $1
        i32.store
        local.get $1
        local.get $0
        local.get $3
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vLevel
        local.tee $1
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/gridState/heightData
        local.tee $4
        i32.store offset=4
        local.get $0
        local.get $1
        i32.add
        local.get $3
        i32.const 50
        i32.mul
        local.get $2
        i32.add
        local.get $4
        i32.add
        i32.load8_u
        i32.store8
       end
       br $folding-inner0
      end
     end
    end
    global.get $assembly/sim/state/visitorState/tickCount
    i32.const 25
    i32.rem_s
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNausea
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNausea
     local.tee $4
     i32.store offset=4
     local.get $1
     local.get $0
     local.get $4
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 1
     i32.sub
     local.tee $1
     i32.const 0
     local.get $1
     i32.const 0
     i32.ge_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
    end
    local.get $2
    i32.const 50
    i32.lt_s
    local.get $2
    i32.const 0
    i32.ge_s
    i32.and
    local.get $3
    i32.const 0
    i32.ge_s
    i32.and
    local.get $3
    i32.const 50
    i32.lt_s
    i32.and
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/parkState/pukeData
     local.tee $1
     i32.store
     global.get $assembly/sim/state/visitorState/tickCount
     i32.const 6
     i32.rem_s
     i32.const 1
     local.get $3
     i32.const 50
     i32.mul
     local.get $2
     i32.add
     local.get $1
     i32.add
     i32.load8_u
     select
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $4
      i32.store offset=4
      local.get $1
      local.get $0
      local.get $4
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      i32.load
      i32.const 2
      i32.sub
      local.tee $1
      i32.const 0
      local.get $1
      i32.const 0
      i32.ge_s
      select
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vNausea
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const 2
    i32.shl
    local.tee $1
    i32.add
    i32.load
    i32.const 100
    i32.ge_s
    if
     local.get $2
     local.get $3
     call $assembly/sim/visitors/visitors/tryPukeAt
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNausea
     local.tee $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNausea
     local.tee $3
     i32.store offset=4
     local.get $2
     local.get $0
     local.get $1
     local.get $3
     i32.add
     i32.load
     i32.const 55
     i32.sub
     local.tee $2
     i32.const 0
     local.get $2
     i32.const 0
     i32.ge_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vPukeTimer
     local.tee $2
     i32.store
     local.get $2
     local.get $0
     i32.const 14
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $3
     i32.store offset=4
     local.get $2
     local.get $0
     local.get $1
     local.get $3
     i32.add
     i32.load
     i32.const 18
     i32.sub
     local.tee $1
     i32.const 0
     local.get $1
     i32.const 0
     i32.ge_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueX
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueY
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vCriminal
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.load8_u
    i32.const 1
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vCrimeCooldown
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $1
     i32.const 0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vCrimeCooldown
      local.tee $2
      i32.store
      local.get $2
      local.get $0
      local.get $1
      i32.const 1
      i32.sub
      call $~lib/staticarray/StaticArray<i32>#__uset
     else
      local.get $0
      call $assembly/sim/visitors/visitors/pickTheftVictim
      local.tee $1
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vWallet
       local.tee $4
       i32.store
       local.get $4
       local.get $1
       i32.const 2
       i32.shl
       local.tee $4
       i32.add
       i32.load
       i32.const 0
       i32.gt_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vWallet
        local.tee $5
        i32.store
        local.get $5
        local.get $1
        i32.const 0
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vSatisfaction
        local.tee $5
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vSatisfaction
        local.tee $6
        i32.store offset=4
        local.get $5
        local.get $1
        local.get $4
        local.get $6
        i32.add
        i32.load
        i32.const 24
        i32.sub
        local.tee $1
        i32.const 0
        local.get $1
        i32.const 0
        i32.ge_s
        select
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $assembly/sim/state/parkState/theftCount
        i32.const 1
        i32.add
        global.set $assembly/sim/state/parkState/theftCount
        local.get $2
        local.get $3
        i32.const 10
        call $assembly/sim/visitors/visitors/applyCrimeShock
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vState
        local.tee $1
        i32.store
        local.get $0
        local.get $1
        i32.add
        i32.const 4
        i32.store8
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vTimer
        local.tee $1
        i32.store
        local.get $1
        local.get $0
        i32.const 45
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vCrimeCooldown
        local.tee $1
        i32.store
        local.get $1
        local.get $0
        i32.const 4
        call $~lib/staticarray/StaticArray<i32>#__uset
        br $folding-inner0
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vCrimeTimer
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 1
     i32.sub
     local.set $1
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vCrimeTimer
     local.tee $2
     i32.store
     local.get $2
     local.get $0
     local.get $1
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $1
     i32.const 0
     i32.le_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.const 4
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTimer
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 40
      call $~lib/staticarray/StaticArray<i32>#__uset
      br $folding-inner0
     end
    end
    global.get $assembly/sim/state/visitorState/tickCount
    i32.const 5
    i32.rem_s
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $2
     i32.store offset=4
     local.get $2
     local.get $0
     i32.const 6
     i32.mul
     local.tee $2
     i32.const 3
     i32.add
     local.tee $3
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 1
     i32.add
     local.set $4
     local.get $1
     local.get $3
     i32.const 100
     local.get $4
     local.get $4
     i32.const 100
     i32.gt_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $3
     i32.store offset=4
     local.get $3
     local.get $2
     i32.const 4
     i32.add
     local.tee $3
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 2
     i32.add
     local.set $4
     local.get $1
     local.get $3
     i32.const 100
     local.get $4
     local.get $4
     i32.const 100
     i32.gt_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $3
     i32.store offset=4
     local.get $3
     local.get $2
     i32.const 5
     i32.add
     local.tee $2
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 1
     i32.add
     local.set $3
     local.get $1
     local.get $2
     i32.const 100
     local.get $3
     local.get $3
     i32.const 100
     i32.gt_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
    end
    local.get $0
    call $assembly/sim/visitors/visitors/shouldLeave
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 4
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTimer
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const 25
     call $~lib/staticarray/StaticArray<i32>#__uset
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vNeeds
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const 6
    i32.mul
    local.tee $1
    i32.const 3
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $2
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vNeeds
    local.tee $3
    i32.store
    local.get $3
    local.get $1
    i32.const 4
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $3
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vNeeds
    local.tee $4
    i32.store
    local.get $4
    local.get $1
    i32.const 5
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $1
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $1
    local.get $3
    local.get $2
    local.get $2
    local.get $3
    i32.lt_s
    select
    local.tee $2
    local.get $1
    local.get $2
    i32.gt_s
    select
    local.set $1
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTarget
    local.tee $2
    i32.store
    local.get $2
    local.get $0
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.const -1
    i32.eq
    if
     local.get $1
     i32.const 72
     i32.ge_s
     if (result i32)
      i32.const 100
     else
      i32.const 75
      i32.const 55
      i32.const 35
      local.get $1
      i32.const 50
      i32.ge_s
      select
      local.get $1
      i32.const 60
      i32.ge_s
      select
     end
     call $assembly/sim/behavior/rng/nextRand
     i32.const 100
     i32.rem_s
     i32.gt_s
     if
      local.get $0
      call $assembly/sim/visitors/visitors/pickBestInstance
      local.tee $2
      i32.const -1
      i32.ne
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vTarget
       local.tee $3
       i32.store
       local.get $3
       local.get $0
       local.get $2
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vQueueX
       local.tee $2
       i32.store
       local.get $2
       local.get $0
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vQueueY
       local.tee $2
       i32.store
       local.get $2
       local.get $0
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vStuckTimer
       local.tee $2
       i32.store
       local.get $2
       local.get $0
       i32.const 0
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $2
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $3
       i32.store offset=4
       local.get $2
       local.get $0
       local.get $3
       local.get $0
       i32.const 2
       i32.shl
       local.tee $2
       i32.add
       i32.load
       i32.const 1
       i32.sub
       local.tee $3
       i32.const 0
       local.get $3
       i32.const 0
       i32.ge_s
       select
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $3
       i32.store
       local.get $2
       local.get $3
       i32.add
       i32.load
       i32.const 0
       i32.le_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vState
        local.tee $2
        i32.store
        local.get $0
        local.get $2
        i32.add
        i32.const 4
        i32.store8
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vTimer
        local.tee $2
        i32.store
        local.get $2
        local.get $0
        i32.const 30
        call $~lib/staticarray/StaticArray<i32>#__uset
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $2
     i32.store
     local.get $2
     local.get $0
     i32.const 2
     i32.shl
     local.tee $3
     i32.add
     i32.load
     i32.const -1
     i32.eq
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vX
      local.tee $1
      i32.store
      local.get $1
      local.get $3
      i32.add
      i32.load
      local.set $4
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vY
      local.tee $1
      i32.store
      local.get $1
      local.get $3
      i32.add
      i32.load
      local.set $5
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vLevel
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.load8_u
      local.set $6
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vQueueX
      local.tee $1
      i32.store
      local.get $1
      local.get $3
      i32.add
      i32.load
      local.set $2
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vQueueY
      local.tee $1
      i32.store
      local.get $5
      local.get $1
      local.get $3
      i32.add
      i32.load
      local.tee $3
      i32.eq
      local.get $2
      local.get $4
      i32.eq
      i32.and
      local.get $2
      local.get $3
      i32.or
      i32.const 0
      i32.lt_s
      i32.or
      if (result i32)
       i32.const 1
      else
       call $assembly/sim/behavior/rng/nextRand
       i32.const 100
       i32.rem_s
       i32.const 15
       i32.lt_s
      end
      if
       local.get $4
       local.get $5
       local.get $6
       call $assembly/sim/visitors/visitors/pickRandomPathGoal
       local.tee $1
       i32.const 0
       i32.ge_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vQueueX
        local.tee $2
        i32.store
        local.get $2
        local.get $0
        local.get $1
        i32.const 65535
        i32.and
        local.tee $2
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vQueueY
        local.tee $3
        i32.store
        local.get $3
        local.get $0
        local.get $1
        i32.const 16
        i32.shr_s
        i32.const 65535
        i32.and
        local.tee $3
        call $~lib/staticarray/StaticArray<i32>#__uset
       else
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vQueueX
        local.tee $1
        i32.store
        i32.const 25
        local.set $2
        local.get $1
        local.get $0
        i32.const 25
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vQueueY
        local.tee $1
        i32.store
        i32.const 49
        local.set $3
        local.get $1
        local.get $0
        i32.const 49
        call $~lib/staticarray/StaticArray<i32>#__uset
       end
      end
      local.get $4
      local.get $5
      local.get $6
      local.get $2
      local.get $3
      local.get $6
      call $assembly/sim/behavior/navigation/bfsNextStepLevel
      local.tee $1
      i32.const 0
      i32.lt_s
      if
       local.get $4
       local.get $5
       local.get $6
       local.get $2
       local.get $3
       call $assembly/sim/behavior/navigation/randomRoamStepLevel
       local.set $1
      end
      local.get $1
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vX
       local.tee $2
       i32.store
       local.get $2
       local.get $0
       local.get $1
       i32.const 1023
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vY
       local.tee $2
       i32.store
       local.get $2
       local.get $0
       local.get $1
       i32.const 10
       i32.shr_s
       i32.const 1023
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vLevel
       local.tee $2
       i32.store
       local.get $0
       local.get $2
       i32.add
       local.get $1
       i32.const 20
       i32.shr_s
       i32.const 31
       i32.and
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vStuckTimer
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const 0
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vStuckTimer
       local.tee $1
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vStuckTimer
       local.tee $2
       i32.store offset=4
       local.get $1
       local.get $0
       local.get $2
       local.get $0
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 1
       i32.add
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      br $folding-inner0
     end
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTarget
    local.tee $2
    i32.store
    local.get $2
    local.get $0
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $2
    i32.const 0
    i32.lt_s
    if (result i32)
     i32.const 1
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instActive
     local.tee $3
     i32.store
     local.get $2
     local.get $3
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
    end
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instTemplateId
    local.tee $3
    i32.store
    local.get $3
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $3
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/tmplCategory
    local.tee $4
    i32.store
    local.get $2
    local.get $4
    local.get $3
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $4
    local.get $3
    call $assembly/sim/visitors/visitors/resolveApproachTile
    local.tee $5
    i32.const -1
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vStuckTimer
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vStuckTimer
     local.tee $2
     i32.store offset=4
     local.get $1
     local.get $0
     local.get $2
     local.get $0
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     i32.load
     i32.const 1
     i32.add
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vStuckTimer
     local.tee $2
     i32.store
     local.get $1
     local.get $2
     i32.add
     i32.load
     i32.const 10
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTarget
      local.tee $2
      i32.store
      local.get $2
      local.get $0
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $0
      local.get $1
      local.get $3
      i32.add
      i32.load
      i32.const 3
      i32.sub
      local.tee $1
      i32.const 0
      local.get $1
      i32.const 0
      i32.ge_s
      select
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vStuckTimer
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
     br $folding-inner0
    end
    local.get $5
    i32.const 65535
    i32.and
    local.tee $6
    i32.const 50
    i32.ge_u
    local.get $5
    i32.const 16
    i32.shr_s
    i32.const 65535
    i32.and
    local.tee $5
    i32.const 50
    i32.ge_u
    i32.or
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vX
    local.tee $7
    i32.store
    local.get $7
    local.get $0
    i32.const 2
    i32.shl
    local.tee $7
    i32.add
    i32.load
    local.set $8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vY
    local.tee $9
    i32.store
    local.get $7
    local.get $9
    i32.add
    i32.load
    local.set $9
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vLevel
    local.tee $10
    i32.store
    local.get $0
    local.get $10
    i32.add
    i32.load8_u
    local.set $10
    local.get $5
    local.get $9
    i32.eq
    local.get $6
    local.get $8
    i32.eq
    i32.and
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instBroken
     local.tee $1
     i32.store
     local.get $1
     local.get $2
     i32.add
     i32.load8_u
     i32.const 1
     i32.eq
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTarget
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $2
      i32.store offset=4
      local.get $1
      local.get $0
      local.get $2
      local.get $7
      i32.add
      i32.load
      i32.const 3
      i32.sub
      local.tee $0
      i32.const 0
      local.get $0
      i32.const 0
      i32.ge_s
      select
      call $~lib/staticarray/StaticArray<i32>#__uset
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instCapacity
     local.tee $1
     i32.store
     local.get $1
     local.get $2
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     i32.load
     local.set $5
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instCurrentRiders
     local.tee $6
     i32.store
     local.get $5
     local.get $1
     local.get $6
     i32.add
     i32.load
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instTicketPrice
      local.tee $4
      i32.store
      local.get $1
      local.get $4
      i32.add
      i32.load
      local.set $4
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vWallet
      local.tee $5
      i32.store
      local.get $4
      local.get $5
      local.get $0
      i32.const 2
      i32.shl
      local.tee $5
      i32.add
      i32.load
      i32.le_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vWallet
       local.tee $6
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vWallet
       local.tee $7
       i32.store offset=4
       local.get $6
       local.get $0
       local.get $5
       local.get $7
       i32.add
       i32.load
       local.get $4
       i32.sub
       call $~lib/staticarray/StaticArray<i32>#__uset
       local.get $4
       call $assembly/sim/economy/economy/earn
       local.get $2
       local.get $4
       call $assembly/sim/attractions/attractions/recordAttractionVisitAndRevenue
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/attractionState/instCurrentRiders
       local.tee $4
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/attractionState/instCurrentRiders
       local.tee $5
       i32.store offset=4
       local.get $4
       local.get $2
       local.get $1
       local.get $5
       i32.add
       i32.load
       i32.const 1
       i32.add
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vState
       local.tee $1
       i32.store
       local.get $0
       local.get $1
       i32.add
       i32.const 3
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vTimer
       local.tee $1
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/attractionState/tmplRideTicks
       local.tee $2
       i32.store offset=4
       local.get $1
       local.get $0
       local.get $2
       local.get $3
       i32.const 2
       i32.shl
       i32.add
       i32.load
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vTarget
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $1
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $2
       i32.store offset=4
       local.get $1
       local.get $0
       local.get $2
       local.get $0
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 3
       i32.sub
       local.tee $0
       i32.const 0
       local.get $0
       i32.const 0
       i32.ge_s
       select
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
     else
      local.get $4
      local.get $3
      call $assembly/sim/attractions/attractions/isInstantServiceCategory
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vQueueX
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vQueueY
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vTarget
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $1
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $2
       i32.store offset=4
       local.get $1
       local.get $0
       local.get $2
       local.get $0
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 1
       i32.sub
       local.tee $0
       i32.const 0
       local.get $0
       i32.const 0
       i32.ge_s
       select
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/attractionState/instQueueLength
       local.tee $1
       i32.store
       local.get $2
       local.get $1
       local.get $2
       i32.const 2
       i32.shl
       i32.add
       i32.load
       call $assembly/sim/visitors/visitors/findQueueSpotByPosition
       local.tee $1
       i32.const 0
       i32.ge_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vQueueX
        local.tee $2
        i32.store
        local.get $2
        local.get $0
        local.get $1
        i32.const 65535
        i32.and
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vQueueY
        local.tee $2
        i32.store
        local.get $2
        local.get $0
        local.get $1
        i32.const 16
        i32.shr_s
        i32.const 65535
        i32.and
        call $~lib/staticarray/StaticArray<i32>#__uset
       else
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vQueueX
        local.tee $1
        i32.store
        local.get $1
        local.get $0
        local.get $8
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vQueueY
        local.tee $1
        i32.store
        local.get $1
        local.get $0
        local.get $9
        call $~lib/staticarray/StaticArray<i32>#__uset
       end
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vQueueOrder
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       global.get $assembly/sim/state/visitorState/tickCount
       i32.const 8
       i32.shl
       local.get $0
       i32.add
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vState
       local.tee $1
       i32.store
       local.get $0
       local.get $1
       i32.add
       i32.const 2
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vTimer
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const 10
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
     end
     br $folding-inner0
    end
    local.get $1
    i32.const 72
    i32.lt_s
    if
     call $assembly/sim/behavior/rng/nextRand
     i32.const 100
     i32.rem_s
     i32.const 10
     i32.const 16
     i32.const 28
     local.get $1
     i32.const 50
     i32.ge_s
     select
     local.get $1
     i32.const 60
     i32.ge_s
     select
     i32.lt_s
     if
      local.get $8
      local.get $9
      local.get $10
      local.get $6
      local.get $5
      call $assembly/sim/behavior/navigation/randomRoamStepLevel
      local.tee $1
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vX
       local.tee $2
       i32.store
       local.get $2
       local.get $0
       local.get $1
       i32.const 1023
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vY
       local.tee $2
       i32.store
       local.get $2
       local.get $0
       local.get $1
       i32.const 10
       i32.shr_s
       i32.const 1023
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vLevel
       local.tee $2
       i32.store
       local.get $0
       local.get $2
       i32.add
       local.get $1
       i32.const 20
       i32.shr_s
       i32.const 31
       i32.and
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vStuckTimer
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const 0
       call $~lib/staticarray/StaticArray<i32>#__uset
       br $folding-inner0
      end
     end
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $1
    i32.store
    local.get $8
    local.get $9
    local.get $10
    local.get $6
    local.get $5
    local.get $5
    i32.const 50
    i32.mul
    local.get $6
    i32.add
    local.get $1
    i32.add
    i32.load8_u
    call $assembly/sim/behavior/navigation/bfsNextStepLevel
    local.tee $1
    i32.const -1
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vStuckTimer
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vStuckTimer
     local.tee $2
     i32.store offset=4
     local.get $1
     local.get $0
     local.get $2
     local.get $0
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     i32.load
     i32.const 1
     i32.add
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vStuckTimer
     local.tee $2
     i32.store
     local.get $1
     local.get $2
     i32.add
     i32.load
     i32.const 10
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTarget
      local.tee $2
      i32.store
      local.get $2
      local.get $0
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $0
      local.get $1
      local.get $3
      i32.add
      i32.load
      i32.const 3
      i32.sub
      local.tee $1
      i32.const 0
      local.get $1
      i32.const 0
      i32.ge_s
      select
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vStuckTimer
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vX
    local.tee $2
    i32.store
    local.get $2
    local.get $0
    local.get $1
    i32.const 1023
    i32.and
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vY
    local.tee $2
    i32.store
    local.get $2
    local.get $0
    local.get $1
    i32.const 10
    i32.shr_s
    i32.const 1023
    i32.and
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vLevel
    local.tee $2
    i32.store
    local.get $0
    local.get $2
    i32.add
    local.get $1
    i32.const 20
    i32.shr_s
    i32.const 31
    i32.and
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vStuckTimer
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const 0
    call $~lib/staticarray/StaticArray<i32>#__uset
    br $folding-inner0
   end
   local.get $1
   i32.const 2
   i32.eq
   if
    local.get $0
    call $assembly/sim/visitors/visitors/maybeComplainCrowding
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTarget
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $1
    i32.const 0
    i32.lt_s
    if (result i32)
     i32.const 1
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instActive
     local.tee $2
     i32.store
     local.get $1
     local.get $2
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
    end
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 1
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instBroken
    local.tee $2
    i32.store
    local.get $1
    local.get $2
    i32.add
    i32.load8_u
    i32.const 1
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $2
     i32.store offset=4
     local.get $1
     local.get $0
     local.get $2
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 6
     i32.sub
     local.tee $1
     i32.const 0
     local.get $1
     i32.const 0
     i32.ge_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 1
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instTemplateId
    local.tee $2
    i32.store
    local.get $2
    local.get $1
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $2
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/tmplCategory
    local.tee $3
    i32.store
    local.get $3
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.get $2
    call $assembly/sim/attractions/attractions/isInstantServiceCategory
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueX
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueY
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 1
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     br $folding-inner0
    end
    local.get $1
    local.get $1
    local.get $0
    call $assembly/sim/visitors/visitors/getQueuePosition
    local.tee $3
    call $assembly/sim/visitors/visitors/findQueueSpotByPosition
    local.set $4
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instEntranceX
    local.tee $5
    i32.store
    local.get $4
    i32.const 65535
    i32.and
    local.get $5
    local.get $1
    i32.const 2
    i32.shl
    local.tee $5
    i32.add
    i32.load
    local.get $4
    i32.const 0
    i32.ge_s
    local.tee $6
    select
    local.set $7
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instEntranceY
    local.tee $8
    i32.store
    local.get $4
    i32.const 16
    i32.shr_s
    i32.const 65535
    i32.and
    local.get $5
    local.get $8
    i32.add
    i32.load
    local.get $6
    select
    local.set $4
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vQueueX
    local.tee $5
    i32.store
    local.get $5
    local.get $0
    local.get $7
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vQueueY
    local.tee $5
    i32.store
    local.get $5
    local.get $0
    local.get $4
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $4
    local.get $7
    i32.or
    i32.const 0
    i32.ge_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vX
     local.tee $5
     i32.store
     local.get $7
     local.get $5
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.ne
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vY
      local.tee $5
      i32.store
      local.get $4
      local.get $5
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      i32.load
      i32.ne
     end
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/heightData
     local.tee $5
     i32.store
     local.get $4
     i32.const 50
     i32.mul
     local.get $7
     i32.add
     local.get $5
     i32.add
     i32.load8_u
     local.set $5
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vX
     local.tee $6
     i32.store
     local.get $6
     local.get $0
     i32.const 2
     i32.shl
     local.tee $6
     i32.add
     i32.load
     local.set $8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vY
     local.tee $9
     i32.store
     local.get $6
     local.get $9
     i32.add
     i32.load
     local.set $6
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vLevel
     local.tee $9
     i32.store
     local.get $8
     local.get $6
     local.get $0
     local.get $9
     i32.add
     i32.load8_u
     local.get $7
     local.get $4
     local.get $5
     call $assembly/sim/behavior/navigation/bfsNextStepLevel
     local.tee $5
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vX
      local.tee $6
      i32.store
      local.get $6
      local.get $0
      local.get $5
      i32.const 1023
      i32.and
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vY
      local.tee $6
      i32.store
      local.get $6
      local.get $0
      local.get $5
      i32.const 10
      i32.shr_s
      i32.const 1023
      i32.and
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vLevel
      local.tee $6
      i32.store
      local.get $0
      local.get $6
      i32.add
      local.get $5
      i32.const 20
      i32.shr_s
      i32.const 31
      i32.and
      i32.store8
     end
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTimer
    local.tee $5
    i32.store
    local.get $5
    local.get $0
    i32.const 2
    i32.shl
    local.tee $5
    i32.add
    i32.load
    i32.const 1
    i32.sub
    local.set $6
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTimer
    local.tee $8
    i32.store
    local.get $8
    local.get $0
    local.get $6
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $assembly/sim/state/visitorState/tickCount
    i32.const 7
    i32.and
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $8
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $9
     i32.store offset=4
     local.get $9
     local.get $0
     i32.const 6
     i32.mul
     i32.const 5
     i32.add
     local.tee $9
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 1
     i32.add
     local.set $10
     local.get $8
     local.get $9
     i32.const 100
     local.get $10
     local.get $10
     i32.const 100
     i32.gt_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNausea
     local.tee $8
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNausea
     local.tee $9
     i32.store offset=4
     local.get $8
     local.get $0
     local.get $5
     local.get $9
     i32.add
     i32.load
     i32.const 1
     i32.sub
     local.tee $8
     i32.const 0
     local.get $8
     i32.const 0
     i32.ge_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $8
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $9
     i32.store offset=4
     local.get $8
     local.get $0
     local.get $5
     local.get $9
     i32.add
     i32.load
     i32.const 1
     i32.sub
     local.tee $5
     i32.const 0
     local.get $5
     i32.const 0
     i32.ge_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vX
    local.tee $5
    i32.store
    i32.const 0
    local.get $7
    local.get $5
    local.get $0
    i32.const 2
    i32.shl
    local.tee $5
    i32.add
    i32.load
    i32.eq
    local.tee $7
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vY
     local.tee $7
     i32.store
     local.get $4
     local.get $5
     local.get $7
     i32.add
     i32.load
     i32.eq
    else
     local.get $7
    end
    local.get $3
    select
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instCurrentRiders
     local.tee $3
     i32.store
     local.get $3
     local.get $1
     i32.const 2
     i32.shl
     local.tee $3
     i32.add
     i32.load
     local.set $4
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instCapacity
     local.tee $5
     i32.store
     local.get $4
     local.get $3
     local.get $5
     i32.add
     i32.load
     i32.lt_s
    else
     i32.const 0
    end
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instTicketPrice
     local.tee $3
     i32.store
     local.get $3
     local.get $1
     i32.const 2
     i32.shl
     local.tee $3
     i32.add
     i32.load
     local.set $4
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vWallet
     local.tee $5
     i32.store
     local.get $4
     local.get $5
     local.get $0
     i32.const 2
     i32.shl
     local.tee $5
     i32.add
     i32.load
     i32.le_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vWallet
      local.tee $6
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vWallet
      local.tee $7
      i32.store offset=4
      local.get $6
      local.get $0
      local.get $5
      local.get $7
      i32.add
      i32.load
      local.get $4
      i32.sub
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $4
      call $assembly/sim/economy/economy/earn
      local.get $1
      local.get $4
      call $assembly/sim/attractions/attractions/recordAttractionVisitAndRevenue
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instCurrentRiders
      local.tee $4
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instCurrentRiders
      local.tee $5
      i32.store offset=4
      local.get $4
      local.get $1
      local.get $3
      local.get $5
      i32.add
      i32.load
      i32.const 1
      i32.add
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.const 3
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTimer
      local.tee $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/tmplRideTicks
      local.tee $3
      i32.store offset=4
      local.get $1
      local.get $0
      local.get $3
      local.get $2
      i32.const 2
      i32.shl
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTarget
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.const 1
      i32.store8
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueOrder
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const 0
     call $~lib/staticarray/StaticArray<i32>#__uset
    else
     local.get $6
     i32.const 0
     i32.le_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTimer
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      call $assembly/sim/behavior/rng/nextRand
      i32.const 8
      i32.rem_s
      i32.const 8
      i32.add
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
    end
    br $folding-inner0
   end
   local.get $1
   i32.const 3
   i32.eq
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTimer
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const 2
    i32.shl
    local.tee $1
    i32.add
    i32.load
    i32.const 1
    i32.sub
    local.set $3
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTimer
    local.tee $4
    i32.store
    local.get $4
    local.get $0
    local.get $3
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $3
    i32.const 0
    i32.le_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $3
     i32.store
     local.get $1
     local.get $3
     i32.add
     i32.load
     local.tee $3
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instCurrentRiders
      local.tee $4
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instCurrentRiders
      local.tee $5
      i32.store offset=4
      local.get $4
      local.get $3
      local.get $5
      local.get $3
      i32.const 2
      i32.shl
      local.tee $4
      i32.add
      i32.load
      i32.const 1
      i32.sub
      local.tee $5
      i32.const 0
      local.get $5
      i32.const 0
      i32.ge_s
      select
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instTemplateId
      local.tee $5
      i32.store
      local.get $4
      local.get $5
      i32.add
      i32.load
      local.set $4
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/tmplCategory
      local.tee $5
      i32.store
      local.get $5
      local.get $4
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.set $5
      local.get $3
      call $assembly/sim/attractions/attractions/getInstEffectiveAppeal
      local.set $6
      local.get $4
      i32.const 17
      i32.eq
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vNeeds
       local.tee $4
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vNeeds
       local.tee $5
       i32.store offset=4
       local.get $5
       local.get $0
       i32.const 6
       i32.mul
       local.tee $5
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 45
       i32.sub
       local.set $6
       local.get $4
       local.get $5
       local.get $6
       i32.const 0
       local.get $6
       i32.const 0
       i32.ge_s
       select
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $4
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vSatisfaction
       local.tee $5
       i32.store offset=4
       local.get $4
       local.get $0
       i32.const 100
       local.get $1
       local.get $5
       i32.add
       i32.load
       i32.const 10
       i32.add
       local.tee $4
       local.get $4
       i32.const 100
       i32.gt_s
       select
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vExcitement
       local.tee $4
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vExcitement
       local.tee $5
       i32.store offset=4
       local.get $4
       local.get $0
       i32.const 100
       local.get $1
       local.get $5
       i32.add
       i32.load
       i32.const 5
       i32.add
       local.tee $1
       local.get $1
       i32.const 100
       i32.gt_s
       select
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vBalloonTimer
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       call $assembly/sim/behavior/rng/nextRand
       i32.const 110
       i32.rem_s
       i32.const 130
       i32.add
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       local.get $4
       i32.const 18
       i32.eq
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vNeeds
        local.tee $1
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vNeeds
        local.tee $4
        i32.store offset=4
        local.get $4
        local.get $0
        i32.const 6
        i32.mul
        i32.const 2
        i32.add
        local.tee $4
        i32.const 2
        i32.shl
        i32.add
        i32.load
        i32.const 25
        i32.sub
        local.set $5
        local.get $1
        local.get $4
        local.get $5
        i32.const 0
        local.get $5
        i32.const 0
        i32.ge_s
        select
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vExcitement
        local.tee $1
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vExcitement
        local.tee $4
        i32.store offset=4
        local.get $1
        local.get $0
        local.get $4
        local.get $0
        i32.const 2
        i32.shl
        local.tee $1
        i32.add
        i32.load
        i32.const 4
        i32.sub
        local.tee $4
        i32.const 0
        local.get $4
        i32.const 0
        i32.ge_s
        select
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $assembly/sim/state/parkState/isRainingNow
        i32.const 1
        i32.eq
        if
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vUmbrellaTimer
         local.tee $4
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vUmbrellaTimer
         local.tee $5
         i32.store offset=4
         local.get $4
         local.get $0
         local.get $1
         local.get $5
         i32.add
         i32.load
         local.tee $4
         call $assembly/sim/behavior/rng/nextRand
         i32.const 450
         i32.rem_s
         i32.const 900
         i32.add
         local.tee $5
         local.get $4
         local.get $5
         i32.gt_s
         select
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vSatisfaction
         local.tee $4
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vSatisfaction
         local.tee $5
         i32.store offset=4
         local.get $4
         local.get $0
         i32.const 100
         local.get $1
         local.get $5
         i32.add
         i32.load
         i32.const 12
         i32.add
         local.tee $1
         local.get $1
         i32.const 100
         i32.gt_s
         select
         call $~lib/staticarray/StaticArray<i32>#__uset
        else
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vSatisfaction
         local.tee $1
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vSatisfaction
         local.tee $4
         i32.store offset=4
         local.get $1
         local.get $0
         i32.const 100
         local.get $4
         local.get $0
         i32.const 2
         i32.shl
         i32.add
         i32.load
         i32.const 5
         i32.add
         local.tee $1
         local.get $1
         i32.const 100
         i32.gt_s
         select
         call $~lib/staticarray/StaticArray<i32>#__uset
        end
       else
        local.get $5
        i32.const 3
        i32.eq
        if
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vNeeds
         local.tee $1
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vNeeds
         local.tee $4
         i32.store offset=4
         local.get $4
         local.get $0
         i32.const 6
         i32.mul
         local.tee $4
         i32.const 3
         i32.add
         local.tee $5
         i32.const 2
         i32.shl
         i32.add
         i32.load
         i32.const 60
         i32.sub
         local.set $6
         local.get $1
         local.get $5
         local.get $6
         i32.const 0
         local.get $6
         i32.const 0
         i32.ge_s
         select
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vSatisfaction
         local.tee $1
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vSatisfaction
         local.tee $5
         i32.store offset=4
         local.get $1
         local.get $0
         i32.const 100
         local.get $5
         local.get $0
         i32.const 2
         i32.shl
         i32.add
         i32.load
         i32.const 8
         i32.add
         local.tee $1
         local.get $1
         i32.const 100
         i32.gt_s
         select
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vNeeds
         local.tee $1
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vNeeds
         local.tee $5
         i32.store offset=4
         local.get $5
         local.get $4
         i32.const 5
         i32.add
         local.tee $4
         i32.const 2
         i32.shl
         i32.add
         i32.load
         i32.const 5
         i32.add
         local.set $5
         local.get $1
         local.get $4
         i32.const 100
         local.get $5
         local.get $5
         i32.const 100
         i32.gt_s
         select
         call $~lib/staticarray/StaticArray<i32>#__uset
        else
         local.get $5
         i32.const 4
         i32.eq
         if
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/visitorState/vNeeds
          local.tee $1
          i32.store
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/visitorState/vNeeds
          local.tee $4
          i32.store offset=4
          local.get $4
          local.get $0
          i32.const 6
          i32.mul
          local.tee $4
          i32.const 4
          i32.add
          local.tee $5
          i32.const 2
          i32.shl
          i32.add
          i32.load
          i32.const 70
          i32.sub
          local.set $6
          local.get $1
          local.get $5
          local.get $6
          i32.const 0
          local.get $6
          i32.const 0
          i32.ge_s
          select
          call $~lib/staticarray/StaticArray<i32>#__uset
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/visitorState/vSatisfaction
          local.tee $1
          i32.store
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/visitorState/vSatisfaction
          local.tee $5
          i32.store offset=4
          local.get $1
          local.get $0
          i32.const 100
          local.get $5
          local.get $0
          i32.const 2
          i32.shl
          i32.add
          i32.load
          i32.const 6
          i32.add
          local.tee $1
          local.get $1
          i32.const 100
          i32.gt_s
          select
          call $~lib/staticarray/StaticArray<i32>#__uset
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/visitorState/vNeeds
          local.tee $1
          i32.store
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/visitorState/vNeeds
          local.tee $5
          i32.store offset=4
          local.get $5
          local.get $4
          i32.const 5
          i32.add
          local.tee $4
          i32.const 2
          i32.shl
          i32.add
          i32.load
          i32.const 10
          i32.add
          local.set $5
          local.get $1
          local.get $4
          i32.const 100
          local.get $5
          local.get $5
          i32.const 100
          i32.gt_s
          select
          call $~lib/staticarray/StaticArray<i32>#__uset
         else
          local.get $5
          i32.const 5
          i32.eq
          if
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vNeeds
           local.tee $1
           i32.store
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vNeeds
           local.tee $4
           i32.store offset=4
           local.get $4
           local.get $0
           i32.const 6
           i32.mul
           i32.const 5
           i32.add
           local.tee $4
           i32.const 2
           i32.shl
           i32.add
           i32.load
           i32.const 80
           i32.sub
           local.set $5
           local.get $1
           local.get $4
           local.get $5
           i32.const 0
           local.get $5
           i32.const 0
           i32.ge_s
           select
           call $~lib/staticarray/StaticArray<i32>#__uset
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vSatisfaction
           local.tee $1
           i32.store
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vSatisfaction
           local.tee $4
           i32.store offset=4
           local.get $1
           local.get $0
           i32.const 100
           local.get $4
           local.get $0
           i32.const 2
           i32.shl
           i32.add
           i32.load
           i32.const 5
           i32.add
           local.tee $1
           local.get $1
           i32.const 100
           i32.gt_s
           select
           call $~lib/staticarray/StaticArray<i32>#__uset
          else
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vNeeds
           local.tee $1
           i32.store
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vNeeds
           local.tee $7
           i32.store offset=4
           local.get $7
           local.get $0
           i32.const 6
           i32.mul
           local.get $5
           i32.add
           local.tee $7
           i32.const 2
           i32.shl
           i32.add
           i32.load
           i32.const 40
           i32.sub
           local.set $8
           local.get $1
           local.get $7
           local.get $8
           i32.const 0
           local.get $8
           i32.const 0
           i32.ge_s
           select
           call $~lib/staticarray/StaticArray<i32>#__uset
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vSatisfaction
           local.tee $1
           i32.store
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vSatisfaction
           local.tee $7
           i32.store offset=4
           local.get $1
           local.get $0
           i32.const 100
           local.get $7
           local.get $0
           i32.const 2
           i32.shl
           local.tee $1
           i32.add
           i32.load
           local.get $6
           i32.const 5
           i32.div_s
           i32.add
           i32.const 10
           i32.add
           local.tee $6
           local.get $6
           i32.const 100
           i32.gt_s
           select
           call $~lib/staticarray/StaticArray<i32>#__uset
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vNausea
           local.tee $6
           i32.store
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/visitorState/vNausea
           local.tee $7
           i32.store offset=4
           local.get $1
           local.get $7
           i32.add
           i32.load
           local.set $7
           global.get $~lib/memory/__stack_pointer
           global.get $assembly/sim/state/attractionState/tmplNauseaGain
           local.tee $8
           i32.store offset=4
           local.get $6
           local.get $0
           i32.const 140
           local.get $7
           local.get $8
           local.get $4
           i32.const 2
           i32.shl
           i32.add
           i32.load
           i32.add
           local.tee $4
           local.get $4
           i32.const 140
           i32.gt_s
           select
           call $~lib/staticarray/StaticArray<i32>#__uset
           local.get $5
           i32.const 2
           i32.eq
           if
            global.get $~lib/memory/__stack_pointer
            global.get $assembly/sim/state/visitorState/vExcitementTolerance
            local.tee $4
            i32.store
            global.get $~lib/memory/__stack_pointer
            global.get $assembly/sim/state/visitorState/vExcitementTolerance
            local.tee $5
            i32.store offset=4
            local.get $4
            local.get $0
            i32.const 100
            local.get $1
            local.get $5
            i32.add
            i32.load
            i32.const 2
            i32.add
            local.tee $4
            local.get $4
            i32.const 100
            i32.gt_s
            select
            call $~lib/staticarray/StaticArray<i32>#__uset
            global.get $~lib/memory/__stack_pointer
            global.get $assembly/sim/state/visitorState/vExcitement
            local.tee $4
            i32.store
            global.get $~lib/memory/__stack_pointer
            global.get $assembly/sim/state/visitorState/vExcitement
            local.tee $5
            i32.store offset=4
            local.get $4
            local.get $0
            local.get $1
            local.get $5
            i32.add
            i32.load
            i32.const 8
            i32.sub
            local.tee $1
            i32.const 0
            local.get $1
            i32.const 0
            i32.ge_s
            select
            call $~lib/staticarray/StaticArray<i32>#__uset
           else
            local.get $5
            if
             local.get $5
             i32.const 1
             i32.eq
             if
              global.get $~lib/memory/__stack_pointer
              global.get $assembly/sim/state/visitorState/vExcitement
              local.tee $1
              i32.store
              global.get $~lib/memory/__stack_pointer
              global.get $assembly/sim/state/visitorState/vExcitement
              local.tee $4
              i32.store offset=4
              local.get $1
              local.get $0
              i32.const 100
              local.get $4
              local.get $0
              i32.const 2
              i32.shl
              i32.add
              i32.load
              i32.const 14
              i32.add
              local.tee $1
              local.get $1
              i32.const 100
              i32.gt_s
              select
              call $~lib/staticarray/StaticArray<i32>#__uset
             end
            else
             global.get $~lib/memory/__stack_pointer
             global.get $assembly/sim/state/visitorState/vExcitement
             local.tee $1
             i32.store
             global.get $~lib/memory/__stack_pointer
             global.get $assembly/sim/state/visitorState/vExcitement
             local.tee $4
             i32.store offset=4
             local.get $1
             local.get $0
             i32.const 100
             local.get $4
             local.get $0
             i32.const 2
             i32.shl
             i32.add
             i32.load
             i32.const 8
             i32.add
             local.tee $1
             local.get $1
             i32.const 100
             i32.gt_s
             select
             call $~lib/staticarray/StaticArray<i32>#__uset
            end
           end
          end
         end
        end
       end
      end
     end
     local.get $3
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instExitX
      local.tee $1
      i32.store
      local.get $1
      local.get $3
      i32.const 2
      i32.shl
      local.tee $1
      i32.add
      i32.load
      local.set $4
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instExitY
      local.tee $5
      i32.store
      local.get $4
      i32.const 50
      i32.lt_s
      local.get $4
      i32.const 0
      i32.ge_s
      i32.and
      local.get $1
      local.get $5
      i32.add
      i32.load
      local.tee $1
      i32.const 0
      i32.ge_s
      i32.and
      local.get $1
      i32.const 50
      i32.lt_s
      i32.and
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/gridState/gridData
       local.tee $5
       i32.store
       i32.const 1
       local.get $1
       i32.const 50
       i32.mul
       local.get $4
       i32.add
       local.tee $6
       local.get $5
       i32.add
       i32.load8_u
       local.tee $5
       i32.const 4
       i32.eq
       i32.const 1
       local.get $5
       i32.const 9
       i32.eq
       local.get $5
       call $assembly/sim/behavior/navigation/isWalkable
       select
       select
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vX
        local.tee $3
        i32.store
        local.get $3
        local.get $0
        local.get $4
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vY
        local.tee $3
        i32.store
        local.get $3
        local.get $0
        local.get $1
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vLevel
        local.tee $1
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/gridState/heightData
        local.tee $3
        i32.store offset=4
        local.get $0
        local.get $1
        i32.add
        local.get $3
        local.get $6
        i32.add
        i32.load8_u
        i32.store8
       else
        local.get $3
        call $assembly/sim/behavior/employeeBehavior/findAdjacentPath
        local.tee $3
        i32.const 0
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vX
         local.tee $1
         i32.store
         local.get $1
         local.get $0
         local.get $3
         i32.const 65535
         i32.and
         local.tee $1
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vY
         local.tee $4
         i32.store
         local.get $4
         local.get $0
         local.get $3
         i32.const 16
         i32.shr_s
         i32.const 65535
         i32.and
         local.tee $3
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vLevel
         local.tee $4
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/gridState/heightData
         local.tee $5
         i32.store offset=4
         local.get $0
         local.get $4
         i32.add
         local.get $3
         i32.const 50
         i32.mul
         local.get $1
         i32.add
         local.get $5
         i32.add
         i32.load8_u
         i32.store8
        else
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vX
         local.tee $3
         i32.store
         local.get $3
         local.get $0
         local.get $4
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vY
         local.tee $3
         i32.store
         local.get $3
         local.get $0
         local.get $1
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vLevel
         local.tee $3
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/gridState/heightData
         local.tee $5
         i32.store offset=4
         local.get $0
         local.get $3
         i32.add
         local.get $1
         i32.const 50
         i32.mul
         local.get $4
         i32.add
         local.get $5
         i32.add
         i32.load8_u
         i32.store8
        end
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vTarget
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueX
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueY
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vQueueOrder
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const 0
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 1
     i32.store8
     loop $for-loop|0
      local.get $2
      i32.const 3
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vNeeds
       local.tee $1
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vNeeds
       local.tee $3
       i32.store offset=4
       local.get $3
       local.get $0
       i32.const 6
       i32.mul
       local.get $2
       i32.add
       local.tee $3
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 5
       i32.add
       local.set $4
       local.get $1
       local.get $3
       i32.const 100
       local.get $4
       local.get $4
       i32.const 100
       i32.gt_s
       select
       call $~lib/staticarray/StaticArray<i32>#__uset
       local.get $2
       i32.const 1
       i32.add
       local.set $2
       br $for-loop|0
      end
     end
    end
    br $folding-inner0
   end
   local.get $1
   i32.const 4
   i32.eq
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTimer
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    i32.const 2
    i32.shl
    local.tee $1
    i32.add
    i32.load
    i32.const 1
    i32.sub
    local.set $2
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vTimer
    local.tee $3
    i32.store
    local.get $3
    local.get $0
    local.get $2
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vX
    local.tee $3
    i32.store
    local.get $1
    local.get $3
    i32.add
    i32.load
    local.set $3
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vY
    local.tee $4
    i32.store
    local.get $1
    local.get $4
    i32.add
    i32.load
    local.set $1
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vLevel
    local.tee $4
    i32.store
    local.get $0
    local.get $4
    i32.add
    i32.load8_u
    local.set $4
    local.get $1
    i32.const 49
    i32.eq
    local.get $3
    i32.const 25
    i32.eq
    i32.and
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 255
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vCriminal
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 0
     i32.store8
     global.get $assembly/sim/state/visitorState/activeVisitors
     i32.const 1
     i32.sub
     global.set $assembly/sim/state/visitorState/activeVisitors
     br $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $5
    i32.store
    local.get $3
    local.get $1
    local.get $4
    i32.const 25
    i32.const 49
    local.get $5
    i32.const 2475
    i32.add
    i32.load8_u
    call $assembly/sim/behavior/navigation/bfsNextStepLevel
    local.tee $1
    i32.const 0
    i32.ge_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vX
     local.tee $3
     i32.store
     local.get $3
     local.get $0
     local.get $1
     i32.const 1023
     i32.and
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vY
     local.tee $3
     i32.store
     local.get $3
     local.get $0
     local.get $1
     i32.const 10
     i32.shr_s
     i32.const 1023
     i32.and
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vLevel
     local.tee $3
     i32.store
     local.get $0
     local.get $3
     i32.add
     local.get $1
     i32.const 20
     i32.shr_s
     i32.const 31
     i32.and
     i32.store8
    end
    local.get $2
    i32.const 0
    i32.le_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 255
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vCriminal
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.const 0
     i32.store8
     global.get $assembly/sim/state/visitorState/activeVisitors
     i32.const 1
     i32.sub
     global.set $assembly/sim/state/visitorState/activeVisitors
    end
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/behavior/navigation/bfsNextStep (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $4
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $4
  i32.add
  i32.load8_u
  local.set $4
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $5
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   local.get $4
   local.get $2
   local.get $3
   local.get $3
   i32.const 50
   i32.mul
   local.get $2
   i32.add
   local.get $5
   i32.add
   i32.load8_u
   local.tee $5
   call $assembly/sim/behavior/navigation/bfsPathLevel
   i32.const 0
   i32.le_s
   br_if $folding-inner0
   local.get $2
   local.get $3
   local.get $5
   call $assembly/sim/behavior/navigation/nodeIndex
   local.set $2
   local.get $0
   local.get $1
   local.get $4
   call $assembly/sim/behavior/navigation/nodeIndex
   local.set $1
   loop $while-continue|0
    block $while-break|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/pathfindingState/bfsParent
     local.tee $0
     i32.store
     local.get $1
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $0
     i32.eq
     br_if $while-break|0
     local.get $0
     i32.const 0
     i32.lt_s
     br_if $folding-inner0
     local.get $0
     local.set $2
     br $while-continue|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   i32.const 2500
   i32.rem_s
   local.tee $0
   i32.const 50
   i32.rem_s
   local.get $0
   i32.const 50
   i32.div_s
   i32.const 16
   i32.shl
   i32.or
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/behavior/employeeBehavior/choosePatrolTileNear (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $4
   i32.const 36
   i32.lt_s
   if
    call $assembly/sim/behavior/rng/nextRand
    i32.const 13
    i32.rem_s
    i32.const 6
    i32.sub
    local.get $0
    i32.add
    local.tee $2
    i32.const 0
    i32.lt_s
    local.get $2
    i32.const 50
    i32.ge_s
    i32.or
    call $assembly/sim/behavior/rng/nextRand
    i32.const 13
    i32.rem_s
    i32.const 6
    i32.sub
    local.get $1
    i32.add
    local.tee $3
    i32.const 0
    i32.lt_s
    i32.or
    local.get $3
    i32.const 50
    i32.ge_s
    i32.or
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $5
     i32.store
     i32.const 1
     local.get $3
     i32.const 50
     i32.mul
     local.get $2
     i32.add
     local.get $5
     i32.add
     i32.load8_u
     local.tee $5
     i32.const 9
     i32.eq
     local.get $5
     call $assembly/sim/behavior/navigation/isWalkable
     select
     if
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      local.get $2
      local.get $3
      i32.const 16
      i32.shl
      i32.or
      return
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/behavior/employeeBehavior/pickAreaPatrolTile (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.le_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  call $assembly/sim/behavior/rng/nextRand
  local.get $0
  i32.rem_s
  local.get $3
  i32.const 2
  i32.shl
  i32.add
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $0
  i32.add
  i32.load
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $1
  local.get $0
  local.get $2
  i32.add
  i32.load
  call $assembly/sim/behavior/employeeBehavior/choosePatrolTileNear
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/behavior/employeeBehavior/choosePatrolTile (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/securityAreaCount
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $1
  i32.const 0
  i32.gt_s
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaX
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaY
   local.tee $3
   i32.store offset=4
   local.get $1
   local.get $2
   local.get $3
   local.get $0
   call $assembly/sim/behavior/employeeBehavior/pickAreaPatrolTile
   local.tee $0
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    return
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $0
   i32.const 30
   i32.lt_s
   if
    call $assembly/sim/behavior/rng/nextRand
    i32.const 50
    i32.rem_s
    local.set $1
    call $assembly/sim/behavior/rng/nextRand
    i32.const 50
    i32.rem_s
    local.set $2
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $3
    i32.store
    local.get $2
    i32.const 50
    i32.mul
    local.get $1
    i32.add
    local.get $3
    i32.add
    i32.load8_u
    call $assembly/sim/behavior/navigation/isWalkable
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $1
     local.get $2
     i32.const 16
     i32.shl
     i32.or
     return
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/behavior/navigation/randomWalkStepLevel (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 6
  i32.const 3248
  call $~lib/rt/__newBuffer
  local.tee $4
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 6
  i32.const 3296
  call $~lib/rt/__newBuffer
  local.tee $5
  i32.store offset=4
  call $assembly/sim/behavior/rng/nextRand
  i32.const 4
  i32.rem_s
  local.set $7
  block $folding-inner0 (result i32)
   loop $for-loop|0
    local.get $3
    i32.const 4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=8
     local.get $0
     local.get $4
     local.get $3
     local.get $7
     i32.add
     i32.const 4
     i32.rem_s
     i32.const 2
     i32.shl
     local.tee $8
     i32.add
     i32.load
     i32.add
     local.set $6
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=8
     local.get $6
     local.get $1
     local.get $5
     local.get $8
     i32.add
     i32.load
     i32.add
     local.tee $8
     local.get $2
     call $assembly/sim/behavior/navigation/isWalkableAtLevel
     if
      local.get $6
      local.get $8
      i32.const 10
      i32.shl
      i32.or
      local.get $2
      i32.const 20
      i32.shl
      i32.or
      br $folding-inner0
     end
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|0
    end
   end
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/behavior/employeeBehavior/randomEmployeeWanderStep (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $2
  i32.store
  local.get $0
  local.get $1
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_u
  call $assembly/sim/behavior/navigation/randomWalkStepLevel
  local.tee $0
  i32.const 0
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
  i32.const 1023
  i32.and
  local.get $0
  i32.const 10
  i32.shr_s
  i32.const 1023
  i32.and
  i32.const 16
  i32.shl
  i32.or
 )
 (func $assembly/sim/behavior/employeeBehavior/updateSecurity
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  loop $for-loop|0
   local.get $4
   global.get $assembly/sim/state/employeeState/securityCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityActive
    local.tee $0
    i32.store
    block $for-continue|0
     local.get $0
     local.get $4
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/securityX
     local.tee $0
     i32.store
     local.get $0
     local.get $4
     i32.const 2
     i32.shl
     local.tee $0
     i32.add
     i32.load
     local.set $5
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/securityY
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load
     local.set $6
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $0
     i32.store
     i32.const 1
     local.get $6
     i32.const 50
     i32.mul
     local.get $5
     i32.add
     local.get $0
     i32.add
     i32.load8_u
     local.tee $0
     i32.const 9
     i32.eq
     local.get $0
     call $assembly/sim/behavior/navigation/isWalkable
     select
     i32.eqz
     if
      local.get $5
      local.get $6
      call $assembly/sim/behavior/employeeBehavior/stepTowardNearestWalkable
      local.tee $0
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityX
       local.tee $1
       i32.store
       local.get $1
       local.get $4
       local.get $0
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityY
       local.tee $1
       i32.store
       local.get $1
       local.get $4
       local.get $0
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      br $for-continue|0
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/securityTargetVisitor
     local.tee $0
     i32.store
     local.get $0
     local.get $4
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $0
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.load8_u
      i32.const 255
      i32.eq
      if (result i32)
       i32.const 0
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vCriminal
       local.tee $1
       i32.store
       local.get $0
       local.get $1
       i32.add
       i32.load8_u
      end
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityTargetVisitor
       local.tee $0
       i32.store
       local.get $0
       local.get $4
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       i32.const -1
       local.set $0
      end
     end
     local.get $0
     i32.const 0
     i32.lt_s
     if
      i32.const -1
      local.set $0
      i32.const 1073741824
      local.set $1
      i32.const 0
      local.set $3
      loop $for-loop|1
       local.get $3
       i32.const 100
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vState
        local.tee $2
        i32.store
        block $for-continue|1
         local.get $2
         local.get $3
         i32.add
         i32.load8_u
         i32.const 255
         i32.eq
         br_if $for-continue|1
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vCriminal
         local.tee $2
         i32.store
         local.get $2
         local.get $3
         i32.add
         i32.load8_u
         i32.eqz
         br_if $for-continue|1
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vX
         local.tee $2
         i32.store
         local.get $2
         local.get $3
         i32.const 2
         i32.shl
         local.tee $7
         i32.add
         i32.load
         local.get $5
         i32.sub
         local.tee $8
         i32.const 31
         i32.shr_s
         local.set $9
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vY
         local.tee $2
         i32.store
         local.get $8
         local.get $9
         i32.add
         local.get $9
         i32.xor
         local.get $2
         local.get $7
         i32.add
         i32.load
         local.get $6
         i32.sub
         local.tee $2
         i32.const 31
         i32.shr_s
         local.tee $7
         local.get $2
         local.get $7
         i32.add
         i32.xor
         i32.add
         local.tee $2
         i32.const 10
         i32.gt_s
         br_if $for-continue|1
         local.get $1
         local.get $2
         i32.gt_s
         if
          local.get $2
          local.set $1
          local.get $3
          local.set $0
         end
        end
        local.get $3
        i32.const 1
        i32.add
        local.set $3
        br $for-loop|1
       end
      end
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityTargetVisitor
      local.tee $1
      i32.store
      local.get $1
      local.get $4
      local.get $0
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
     local.get $0
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vX
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 2
      i32.shl
      local.tee $1
      i32.add
      i32.load
      local.tee $2
      local.get $5
      i32.sub
      local.tee $3
      i32.const 31
      i32.shr_s
      local.set $7
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vY
      local.tee $8
      i32.store
      local.get $3
      local.get $7
      i32.add
      local.get $7
      i32.xor
      local.get $1
      local.get $8
      i32.add
      i32.load
      local.tee $1
      local.get $6
      i32.sub
      local.tee $3
      i32.const 31
      i32.shr_s
      local.tee $7
      local.get $3
      local.get $7
      i32.add
      i32.xor
      i32.add
      i32.const 1
      i32.le_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vCriminal
       local.tee $1
       i32.store
       local.get $0
       local.get $1
       i32.add
       i32.const 0
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vCrimeTimer
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const 0
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vState
       local.tee $1
       i32.store
       local.get $0
       local.get $1
       i32.add
       i32.const 4
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vTimer
       local.tee $1
       i32.store
       local.get $1
       local.get $0
       i32.const 28
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityTargetVisitor
       local.tee $0
       i32.store
       local.get $0
       local.get $4
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityIncidentsHandled
       local.tee $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityIncidentsHandled
       local.tee $1
       i32.store offset=4
       local.get $0
       local.get $4
       local.get $1
       local.get $4
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 1
       i32.add
       call $~lib/staticarray/StaticArray<i32>#__uset
       br $for-continue|0
      end
      local.get $5
      local.get $6
      local.get $2
      local.get $1
      call $assembly/sim/behavior/navigation/bfsNextStep
      local.tee $0
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityX
       local.tee $1
       i32.store
       local.get $1
       local.get $4
       local.get $0
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityY
       local.tee $1
       i32.store
       local.get $1
       local.get $4
       local.get $0
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityTargetVisitor
       local.tee $0
       i32.store
       local.get $0
       local.get $4
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      br $for-continue|0
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/securityPatrolX
     local.tee $0
     i32.store
     local.get $0
     local.get $4
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     i32.load
     local.set $0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/securityPatrolY
     local.tee $2
     i32.store
     local.get $6
     local.get $1
     local.get $2
     i32.add
     i32.load
     local.tee $3
     i32.eq
     local.get $0
     local.get $5
     i32.eq
     i32.and
     local.get $0
     local.get $3
     i32.or
     i32.const 0
     i32.lt_s
     i32.or
     if
      local.get $4
      call $assembly/sim/behavior/employeeBehavior/choosePatrolTile
      local.tee $1
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityPatrolX
       local.tee $0
       i32.store
       local.get $0
       local.get $4
       local.get $1
       i32.const 65535
       i32.and
       local.tee $0
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityPatrolY
       local.tee $2
       i32.store
       local.get $2
       local.get $4
       local.get $1
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       local.tee $3
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       i32.const -1
       local.set $0
       i32.const -1
       local.set $3
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityPatrolX
       local.tee $1
       i32.store
       local.get $1
       local.get $4
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityPatrolY
       local.tee $1
       i32.store
       local.get $1
       local.get $4
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
     end
     local.get $0
     local.get $3
     i32.or
     i32.const 0
     i32.ge_s
     if
      local.get $5
      local.get $6
      local.get $0
      local.get $3
      call $assembly/sim/behavior/navigation/bfsNextStep
      local.tee $0
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityX
       local.tee $1
       i32.store
       local.get $1
       local.get $4
       local.get $0
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/securityY
       local.tee $1
       i32.store
       local.get $1
       local.get $4
       local.get $0
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       br $for-continue|0
      end
     end
     local.get $5
     local.get $6
     call $assembly/sim/behavior/employeeBehavior/randomEmployeeWanderStep
     local.tee $0
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityX
      local.tee $1
      i32.store
      local.get $1
      local.get $4
      local.get $0
      i32.const 65535
      i32.and
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityY
      local.tee $1
      i32.store
      local.get $1
      local.get $4
      local.get $0
      i32.const 16
      i32.shr_s
      i32.const 65535
      i32.and
      call $~lib/staticarray/StaticArray<i32>#__uset
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityPatrolX
      local.tee $0
      i32.store
      local.get $0
      local.get $4
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityPatrolY
      local.tee $0
      i32.store
      local.get $0
      local.get $4
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/behavior/employeeBehavior/ensureMechanicTargets
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $2
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $0
    i32.store
    block $for-continue|0
     local.get $0
     local.get $2
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instBroken
      local.tee $0
      i32.store
      local.get $0
      local.get $2
      i32.add
      i32.load8_u
      i32.const 1
      i32.ne
     end
     br_if $for-continue|0
     i32.const 0
     local.set $1
     i32.const 0
     local.set $0
     loop $for-loop|1
      local.get $0
      global.get $assembly/sim/state/employeeState/mechanicCount
      i32.lt_s
      if
       block $for-break1
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechActive
        local.tee $3
        i32.store
        local.get $0
        local.get $3
        i32.add
        i32.load8_u
        i32.const 1
        i32.eq
        if (result i32)
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/mechTarget
         local.tee $3
         i32.store
         local.get $2
         local.get $3
         local.get $0
         i32.const 2
         i32.shl
         i32.add
         i32.load
         i32.eq
        else
         i32.const 0
        end
        if
         i32.const 1
         local.set $1
         br $for-break1
        end
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $for-loop|1
       end
      end
     end
     local.get $1
     br_if $for-continue|0
     i32.const 0
     local.set $0
     loop $for-loop|2
      local.get $0
      global.get $assembly/sim/state/employeeState/mechanicCount
      i32.lt_s
      if
       block $for-break2
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechActive
        local.tee $1
        i32.store
        local.get $0
        local.get $1
        i32.add
        i32.load8_u
        i32.const 1
        i32.eq
        if (result i32)
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/mechTarget
         local.tee $1
         i32.store
         local.get $1
         local.get $0
         i32.const 2
         i32.shl
         i32.add
         i32.load
         i32.const 0
         i32.lt_s
        else
         i32.const 0
        end
        if
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/mechTarget
         local.tee $1
         i32.store
         local.get $1
         local.get $0
         local.get $2
         call $~lib/staticarray/StaticArray<i32>#__uset
         br $for-break2
        end
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $for-loop|2
       end
      end
     end
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/behavior/employeeBehavior/updateMechanics
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  call $assembly/sim/behavior/employeeBehavior/ensureMechanicTargets
  loop $for-loop|0
   local.get $2
   global.get $assembly/sim/state/employeeState/mechanicCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechActive
    local.tee $0
    i32.store
    block $for-continue|0
     local.get $0
     local.get $2
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/mechX
     local.tee $0
     i32.store
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     local.tee $0
     i32.add
     i32.load
     local.set $1
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/mechY
     local.tee $3
     i32.store
     local.get $0
     local.get $3
     i32.add
     i32.load
     local.set $0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $3
     i32.store
     i32.const 1
     local.get $0
     i32.const 50
     i32.mul
     local.get $1
     i32.add
     local.get $3
     i32.add
     i32.load8_u
     local.tee $3
     i32.const 9
     i32.eq
     local.get $3
     call $assembly/sim/behavior/navigation/isWalkable
     select
     i32.eqz
     if
      local.get $1
      local.get $0
      call $assembly/sim/behavior/employeeBehavior/stepTowardNearestWalkable
      local.tee $0
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/mechX
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $0
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/mechY
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $0
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      br $for-continue|0
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/mechTarget
     local.tee $0
     i32.store
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $0
     i32.const 0
     i32.lt_s
     local.get $0
     global.get $assembly/sim/state/attractionState/instanceCount
     i32.ge_s
     i32.or
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instActive
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.load8_u
      i32.const 1
      i32.ne
     end
     if (result i32)
      i32.const 1
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instBroken
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.load8_u
      i32.const 1
      i32.ne
     end
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechTarget
      local.tee $0
      i32.store
      local.get $0
      local.get $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechRepairTimer
      local.tee $0
      i32.store
      local.get $0
      local.get $2
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechX
      local.tee $0
      i32.store
      local.get $0
      local.get $2
      i32.const 2
      i32.shl
      local.tee $3
      i32.add
      i32.load
      local.set $4
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechY
      local.tee $0
      i32.store
      local.get $0
      local.get $3
      i32.add
      i32.load
      local.set $5
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechPatrolX
      local.tee $0
      i32.store
      local.get $0
      local.get $3
      i32.add
      i32.load
      local.set $1
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechPatrolY
      local.tee $0
      i32.store
      local.get $5
      local.get $0
      local.get $3
      i32.add
      i32.load
      local.tee $0
      i32.eq
      local.get $1
      local.get $4
      i32.eq
      i32.and
      local.get $0
      local.get $1
      i32.or
      i32.const 0
      i32.lt_s
      i32.or
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/mechAreaCount
       local.tee $6
       i32.store offset=8
       local.get $3
       local.get $6
       i32.add
       i32.load
       local.set $6
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/mechAreaX
       local.tee $7
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/mechAreaY
       local.tee $3
       i32.store offset=4
       local.get $6
       local.get $7
       local.get $3
       local.get $2
       call $assembly/sim/behavior/employeeBehavior/pickAreaPatrolTile
       local.tee $3
       i32.const 0
       i32.ge_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechPatrolX
        local.tee $0
        i32.store
        local.get $0
        local.get $2
        local.get $3
        i32.const 65535
        i32.and
        local.tee $1
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechPatrolY
        local.tee $0
        i32.store
        local.get $0
        local.get $2
        local.get $3
        i32.const 16
        i32.shr_s
        i32.const 65535
        i32.and
        local.tee $0
        call $~lib/staticarray/StaticArray<i32>#__uset
       end
      end
      local.get $0
      local.get $1
      i32.or
      i32.const 0
      i32.ge_s
      if
       local.get $4
       local.get $5
       local.get $1
       local.get $0
       call $assembly/sim/behavior/navigation/bfsNextStep
       local.tee $0
       i32.const 0
       i32.ge_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechX
        local.tee $1
        i32.store
        local.get $1
        local.get $2
        local.get $0
        i32.const 65535
        i32.and
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechY
        local.tee $1
        i32.store
        local.get $1
        local.get $2
        local.get $0
        i32.const 16
        i32.shr_s
        i32.const 65535
        i32.and
        call $~lib/staticarray/StaticArray<i32>#__uset
       else
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechPatrolX
        local.tee $0
        i32.store
        local.get $0
        local.get $2
        i32.const -1
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechPatrolY
        local.tee $0
        i32.store
        local.get $0
        local.get $2
        i32.const -1
        call $~lib/staticarray/StaticArray<i32>#__uset
       end
      else
       local.get $4
       local.get $5
       call $assembly/sim/behavior/employeeBehavior/randomEmployeeWanderStep
       local.tee $0
       i32.const 0
       i32.ge_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechX
        local.tee $1
        i32.store
        local.get $1
        local.get $2
        local.get $0
        i32.const 65535
        i32.and
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/mechY
        local.tee $1
        i32.store
        local.get $1
        local.get $2
        local.get $0
        i32.const 16
        i32.shr_s
        i32.const 65535
        i32.and
        call $~lib/staticarray/StaticArray<i32>#__uset
       end
      end
      br $for-continue|0
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/mechRepairTimer
     local.tee $1
     i32.store
     local.get $1
     local.get $2
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     i32.load
     i32.const 0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechRepairTimer
      local.tee $3
      i32.store
      local.get $1
      local.get $3
      i32.add
      i32.load
      i32.const 1
      i32.sub
      local.set $3
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechRepairTimer
      local.tee $4
      i32.store
      local.get $4
      local.get $2
      local.get $3
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instRepairTicks
      local.tee $4
      i32.store
      local.get $4
      local.get $0
      local.get $3
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $3
      i32.const 0
      i32.le_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/attractionState/instBroken
       local.tee $3
       i32.store
       local.get $0
       local.get $3
       i32.add
       i32.const 0
       i32.store8
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/attractionState/instRepairTicks
       local.tee $3
       i32.store
       local.get $3
       local.get $0
       i32.const 0
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/mechTarget
       local.tee $0
       i32.store
       local.get $0
       local.get $2
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/mechRepairsCompleted
       local.tee $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/mechRepairsCompleted
       local.tee $3
       i32.store offset=4
       local.get $0
       local.get $2
       local.get $1
       local.get $3
       i32.add
       i32.load
       i32.const 1
       i32.add
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      br $for-continue|0
     end
     local.get $0
     call $assembly/sim/behavior/employeeBehavior/findAdjacentPath
     local.tee $1
     i32.const 0
     i32.lt_s
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/mechX
     local.tee $3
     i32.store
     local.get $3
     local.get $2
     i32.const 2
     i32.shl
     local.tee $3
     i32.add
     i32.load
     local.set $4
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/mechY
     local.tee $5
     i32.store
     local.get $1
     i32.const 16
     i32.shr_s
     i32.const 65535
     i32.and
     local.tee $6
     local.get $3
     local.get $5
     i32.add
     i32.load
     local.tee $3
     i32.eq
     local.get $1
     i32.const 65535
     i32.and
     local.tee $1
     local.get $4
     i32.eq
     i32.and
     if
      local.get $0
      call $assembly/sim/behavior/employeeBehavior/calcRepairTicks
      local.set $1
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechRepairTimer
      local.tee $3
      i32.store
      local.get $3
      local.get $2
      local.get $1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instRepairTicks
      local.tee $3
      i32.store
      local.get $3
      local.get $0
      local.get $1
      call $~lib/staticarray/StaticArray<i32>#__uset
      br $for-continue|0
     end
     local.get $4
     local.get $3
     local.get $1
     local.get $6
     call $assembly/sim/behavior/navigation/bfsNextStep
     local.tee $0
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechX
      local.tee $1
      i32.store
      local.get $1
      local.get $2
      local.get $0
      i32.const 65535
      i32.and
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechY
      local.tee $1
      i32.store
      local.get $1
      local.get $2
      local.get $0
      i32.const 16
      i32.shr_s
      i32.const 65535
      i32.and
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/behavior/navigation/bfsPath (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $4
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $4
  i32.add
  i32.load8_u
  local.set $5
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $4
  i32.store
  local.get $0
  local.get $1
  local.get $5
  local.get $2
  local.get $3
  local.get $3
  i32.const 50
  i32.mul
  local.get $2
  i32.add
  local.get $4
  i32.add
  i32.load8_u
  call $assembly/sim/behavior/navigation/bfsPathLevel
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/behavior/employeeBehavior/findNearestDirtyPathForCleaner (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerAreaCount
  local.tee $3
  i32.store
  local.get $3
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $9
  i32.const 0
  i32.le_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   i32.const -1
   local.set $3
   i32.const 1073741824
   local.set $0
   loop $for-loop|0
    local.get $5
    i32.const 50
    i32.lt_s
    if
     i32.const 0
     local.set $6
     loop $for-loop|1
      local.get $6
      i32.const 50
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/parkState/pukeData
       local.tee $4
       i32.store
       local.get $5
       i32.const 50
       i32.mul
       local.get $6
       i32.add
       local.get $4
       i32.add
       i32.load8_u
       if
        local.get $1
        local.get $2
        local.get $6
        local.get $5
        call $assembly/sim/behavior/navigation/bfsPath
        local.tee $4
        local.get $0
        i32.lt_s
        local.get $4
        i32.const 0
        i32.ge_s
        i32.and
        if
         local.get $6
         local.get $5
         i32.const 16
         i32.shl
         i32.or
         local.set $3
         local.get $4
         local.set $0
        end
       end
       local.get $6
       i32.const 1
       i32.add
       local.set $6
       br $for-loop|1
      end
     end
     local.get $5
     i32.const 1
     i32.add
     local.set $5
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   return
  end
  i32.const -1
  local.set $7
  i32.const 1073741824
  local.set $3
  loop $for-loop|00
   local.get $6
   i32.const 50
   i32.lt_s
   if
    i32.const 0
    local.set $5
    loop $for-loop|11
     local.get $5
     i32.const 50
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/parkState/pukeData
      local.tee $4
      i32.store
      block $for-continue|1
       local.get $6
       i32.const 50
       i32.mul
       local.get $5
       i32.add
       local.get $4
       i32.add
       i32.load8_u
       i32.eqz
       br_if $for-continue|1
       i32.const 0
       local.set $8
       i32.const 0
       local.set $4
       loop $for-loop|2
        local.get $4
        local.get $9
        i32.lt_s
        if
         block $for-break2
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/employeeState/cleanerAreaX
          local.tee $10
          i32.store
          local.get $5
          local.get $0
          i32.const 2
          i32.shl
          local.get $4
          i32.add
          i32.const 2
          i32.shl
          local.tee $11
          local.get $10
          i32.add
          i32.load
          i32.sub
          local.tee $10
          i32.const 31
          i32.shr_s
          local.set $12
          global.get $~lib/memory/__stack_pointer
          global.get $assembly/sim/state/employeeState/cleanerAreaY
          local.tee $13
          i32.store
          local.get $10
          local.get $12
          i32.add
          local.get $12
          i32.xor
          local.get $6
          local.get $11
          local.get $13
          i32.add
          i32.load
          i32.sub
          local.tee $10
          i32.const 31
          i32.shr_s
          local.tee $11
          local.get $10
          local.get $11
          i32.add
          i32.xor
          i32.add
          i32.const 6
          i32.le_s
          if
           i32.const 1
           local.set $8
           br $for-break2
          end
          local.get $4
          i32.const 1
          i32.add
          local.set $4
          br $for-loop|2
         end
        end
       end
       local.get $8
       i32.eqz
       br_if $for-continue|1
       local.get $1
       local.get $2
       local.get $5
       local.get $6
       call $assembly/sim/behavior/navigation/bfsPath
       local.tee $4
       local.get $3
       i32.lt_s
       local.get $4
       i32.const 0
       i32.ge_s
       i32.and
       if
        local.get $5
        local.get $6
        i32.const 16
        i32.shl
        i32.or
        local.set $7
        local.get $4
        local.set $3
       end
      end
      local.get $5
      i32.const 1
      i32.add
      local.set $5
      br $for-loop|11
     end
    end
    local.get $6
    i32.const 1
    i32.add
    local.set $6
    br $for-loop|00
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $7
 )
 (func $assembly/sim/behavior/employeeBehavior/updateCleaners
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  loop $for-loop|0
   local.get $2
   global.get $assembly/sim/state/employeeState/cleanerCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerActive
    local.tee $0
    i32.store
    block $for-continue|0
     local.get $0
     local.get $2
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/cleanerX
     local.tee $0
     i32.store
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     local.tee $0
     i32.add
     i32.load
     local.set $4
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/cleanerY
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load
     local.set $5
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $0
     i32.store
     i32.const 1
     local.get $5
     i32.const 50
     i32.mul
     local.get $4
     i32.add
     local.get $0
     i32.add
     i32.load8_u
     local.tee $0
     i32.const 9
     i32.eq
     local.get $0
     call $assembly/sim/behavior/navigation/isWalkable
     select
     i32.eqz
     if
      local.get $4
      local.get $5
      call $assembly/sim/behavior/employeeBehavior/stepTowardNearestWalkable
      local.tee $0
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/cleanerX
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $0
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/cleanerY
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $0
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      br $for-continue|0
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/cleanerTargetX
     local.tee $0
     i32.store
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     local.tee $3
     i32.add
     i32.load
     local.set $0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/cleanerTargetY
     local.tee $1
     i32.store
     local.get $1
     local.get $3
     i32.add
     i32.load
     local.set $1
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/cleanerCleanTimer
     local.tee $6
     i32.store
     local.get $3
     local.get $6
     i32.add
     i32.load
     i32.const 0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerCleanTimer
      local.tee $4
      i32.store
      local.get $3
      local.get $4
      i32.add
      i32.load
      i32.const 1
      i32.sub
      local.set $4
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerCleanTimer
      local.tee $5
      i32.store
      local.get $5
      local.get $2
      local.get $4
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $4
      i32.const 0
      i32.le_s
      local.get $0
      i32.const 0
      i32.ge_s
      i32.and
      local.get $1
      i32.const 0
      i32.ge_s
      i32.and
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/parkState/pukeData
       local.tee $4
       i32.store
       local.get $1
       i32.const 50
       i32.mul
       local.get $0
       i32.add
       local.tee $0
       local.get $4
       i32.add
       i32.load8_u
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/parkState/pukeData
        local.tee $1
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/parkState/pukeData
        local.tee $4
        i32.store offset=4
        local.get $0
        local.get $1
        i32.add
        local.get $0
        local.get $4
        i32.add
        i32.load8_u
        i32.const 1
        i32.sub
        i32.store8
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/cleanerPathsCleaned
        local.tee $0
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/cleanerPathsCleaned
        local.tee $1
        i32.store offset=4
        local.get $0
        local.get $2
        local.get $1
        local.get $3
        i32.add
        i32.load
        i32.const 1
        i32.add
        call $~lib/staticarray/StaticArray<i32>#__uset
       end
      end
      br $for-continue|0
     end
     local.get $0
     local.get $1
     i32.or
     i32.const 0
     i32.lt_s
     if (result i32)
      i32.const 0
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/parkState/pukeData
      local.tee $3
      i32.store
      local.get $1
      i32.const 50
      i32.mul
      local.get $0
      i32.add
      local.get $3
      i32.add
      i32.load8_u
     end
     i32.eqz
     if
      local.get $2
      local.get $4
      local.get $5
      call $assembly/sim/behavior/employeeBehavior/findNearestDirtyPathForCleaner
      local.tee $1
      i32.const 0
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/cleanerTargetX
       local.tee $0
       i32.store
       local.get $0
       local.get $2
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/cleanerTargetY
       local.tee $0
       i32.store
       local.get $0
       local.get $2
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/cleanerPatrolX
       local.tee $0
       i32.store
       local.get $0
       local.get $2
       i32.const 2
       i32.shl
       local.tee $3
       i32.add
       i32.load
       local.set $0
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/cleanerPatrolY
       local.tee $1
       i32.store
       local.get $5
       local.get $1
       local.get $3
       i32.add
       i32.load
       local.tee $1
       i32.eq
       local.get $0
       local.get $4
       i32.eq
       i32.and
       local.get $0
       local.get $1
       i32.or
       i32.const 0
       i32.lt_s
       i32.or
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/cleanerAreaCount
        local.tee $6
        i32.store offset=8
        local.get $3
        local.get $6
        i32.add
        i32.load
        local.set $6
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/cleanerAreaX
        local.tee $7
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/cleanerAreaY
        local.tee $3
        i32.store offset=4
        local.get $6
        local.get $7
        local.get $3
        local.get $2
        call $assembly/sim/behavior/employeeBehavior/pickAreaPatrolTile
        local.tee $3
        i32.const 0
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/cleanerPatrolX
         local.tee $0
         i32.store
         local.get $0
         local.get $2
         local.get $3
         i32.const 65535
         i32.and
         local.tee $0
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/cleanerPatrolY
         local.tee $1
         i32.store
         local.get $1
         local.get $2
         local.get $3
         i32.const 16
         i32.shr_s
         i32.const 65535
         i32.and
         local.tee $1
         call $~lib/staticarray/StaticArray<i32>#__uset
        end
       end
       local.get $0
       local.get $1
       i32.or
       i32.const 0
       i32.ge_s
       if
        local.get $4
        local.get $5
        local.get $0
        local.get $1
        call $assembly/sim/behavior/navigation/bfsNextStep
        local.tee $0
        i32.const 0
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/cleanerX
         local.tee $1
         i32.store
         local.get $1
         local.get $2
         local.get $0
         i32.const 65535
         i32.and
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/cleanerY
         local.tee $1
         i32.store
         local.get $1
         local.get $2
         local.get $0
         i32.const 16
         i32.shr_s
         i32.const 65535
         i32.and
         call $~lib/staticarray/StaticArray<i32>#__uset
        else
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/cleanerPatrolX
         local.tee $0
         i32.store
         local.get $0
         local.get $2
         i32.const -1
         call $~lib/staticarray/StaticArray<i32>#__uset
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/employeeState/cleanerPatrolY
         local.tee $0
         i32.store
         local.get $0
         local.get $2
         i32.const -1
         call $~lib/staticarray/StaticArray<i32>#__uset
        end
        br $for-continue|0
       end
       local.get $4
       local.get $5
       call $assembly/sim/behavior/employeeBehavior/randomEmployeeWanderStep
       local.tee $0
       i32.const 0
       i32.ge_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/cleanerX
        local.tee $1
        i32.store
        local.get $1
        local.get $2
        local.get $0
        i32.const 65535
        i32.and
        call $~lib/staticarray/StaticArray<i32>#__uset
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/employeeState/cleanerY
        local.tee $1
        i32.store
        local.get $1
        local.get $2
        local.get $0
        i32.const 16
        i32.shr_s
        i32.const 65535
        i32.and
        call $~lib/staticarray/StaticArray<i32>#__uset
       end
       br $for-continue|0
      end
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerTargetX
      local.tee $0
      i32.store
      local.get $0
      local.get $2
      local.get $1
      i32.const 65535
      i32.and
      local.tee $0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerTargetY
      local.tee $3
      i32.store
      local.get $3
      local.get $2
      local.get $1
      i32.const 16
      i32.shr_s
      i32.const 65535
      i32.and
      local.tee $1
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
     local.get $1
     local.get $5
     i32.eq
     local.get $0
     local.get $4
     i32.eq
     i32.and
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerCleanTimer
      local.tee $0
      i32.store
      local.get $0
      local.get $2
      i32.const 16
      call $~lib/staticarray/StaticArray<i32>#__uset
      br $for-continue|0
     end
     local.get $4
     local.get $5
     local.get $0
     local.get $1
     call $assembly/sim/behavior/navigation/bfsNextStep
     local.tee $0
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerX
      local.tee $1
      i32.store
      local.get $1
      local.get $2
      local.get $0
      i32.const 65535
      i32.and
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerY
      local.tee $1
      i32.store
      local.get $1
      local.get $2
      local.get $0
      i32.const 16
      i32.shr_s
      i32.const 65535
      i32.and
      call $~lib/staticarray/StaticArray<i32>#__uset
     else
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerTargetX
      local.tee $0
      i32.store
      local.get $0
      local.get $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerTargetY
      local.tee $0
      i32.store
      local.get $0
      local.get $2
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/behavior/employeeBehavior/chooseEntertainerPatrolTile (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/entertainerAreaCount
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $1
  i32.const 0
  i32.gt_s
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaX
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaY
   local.tee $3
   i32.store offset=4
   local.get $1
   local.get $2
   local.get $3
   local.get $0
   call $assembly/sim/behavior/employeeBehavior/pickAreaPatrolTile
   local.tee $0
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    return
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $0
   i32.const 30
   i32.lt_s
   if
    call $assembly/sim/behavior/rng/nextRand
    i32.const 50
    i32.rem_s
    local.set $1
    call $assembly/sim/behavior/rng/nextRand
    i32.const 50
    i32.rem_s
    local.set $2
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $3
    i32.store
    local.get $2
    i32.const 50
    i32.mul
    local.get $1
    i32.add
    local.get $3
    i32.add
    i32.load8_u
    call $assembly/sim/behavior/navigation/isWalkable
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $1
     local.get $2
     i32.const 16
     i32.shl
     i32.or
     return
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/behavior/employeeBehavior/updateEntertainers
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $assembly/sim/state/visitorState/tickCount
  i32.const 12
  i32.rem_s
  i32.eqz
  local.set $3
  loop $for-loop|0
   local.get $2
   global.get $assembly/sim/state/employeeState/entertainerCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerActive
    local.tee $0
    i32.store
    block $for-continue|0
     local.get $0
     local.get $2
     i32.add
     i32.load8_u
     i32.const 1
     i32.ne
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/entertainerX
     local.tee $0
     i32.store
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     local.tee $0
     i32.add
     i32.load
     local.set $4
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/entertainerY
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load
     local.set $5
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $0
     i32.store
     i32.const 1
     local.get $5
     i32.const 50
     i32.mul
     local.get $4
     i32.add
     local.get $0
     i32.add
     i32.load8_u
     local.tee $0
     i32.const 9
     i32.eq
     local.get $0
     call $assembly/sim/behavior/navigation/isWalkable
     select
     i32.eqz
     if
      local.get $4
      local.get $5
      call $assembly/sim/behavior/employeeBehavior/stepTowardNearestWalkable
      local.tee $0
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerX
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $0
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerY
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $0
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
      br $for-continue|0
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/entertainerPatrolX
     local.tee $0
     i32.store
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     i32.load
     local.set $0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/entertainerPatrolY
     local.tee $6
     i32.store
     local.get $5
     local.get $1
     local.get $6
     i32.add
     i32.load
     local.tee $1
     i32.eq
     local.get $0
     local.get $4
     i32.eq
     i32.and
     local.get $0
     local.get $1
     i32.or
     i32.const 0
     i32.lt_s
     i32.or
     if
      local.get $2
      call $assembly/sim/behavior/employeeBehavior/chooseEntertainerPatrolTile
      local.tee $6
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerPatrolX
       local.tee $0
       i32.store
       local.get $0
       local.get $2
       local.get $6
       i32.const 65535
       i32.and
       local.tee $0
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerPatrolY
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $6
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       local.tee $1
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerPatrolX
       local.tee $6
       i32.store
       local.get $6
       local.get $2
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerPatrolY
       local.tee $6
       i32.store
       local.get $6
       local.get $2
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
     end
     local.get $0
     local.get $1
     i32.or
     i32.const 0
     i32.ge_s
     if
      local.get $4
      local.get $5
      local.get $0
      local.get $1
      call $assembly/sim/behavior/navigation/bfsNextStep
      local.tee $0
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerX
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $0
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerY
       local.tee $1
       i32.store
       local.get $1
       local.get $2
       local.get $0
       i32.const 16
       i32.shr_s
       i32.const 65535
       i32.and
       call $~lib/staticarray/StaticArray<i32>#__uset
      else
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerPatrolX
       local.tee $0
       i32.store
       local.get $0
       local.get $2
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/employeeState/entertainerPatrolY
       local.tee $0
       i32.store
       local.get $0
       local.get $2
       i32.const -1
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
     end
     local.get $3
     i32.eqz
     br_if $for-continue|0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/entertainerX
     local.tee $0
     i32.store
     local.get $0
     local.get $2
     i32.const 2
     i32.shl
     local.tee $0
     i32.add
     i32.load
     local.set $5
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/entertainerY
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load
     local.set $6
     i32.const 0
     local.set $1
     i32.const 0
     local.set $0
     loop $for-loop|1
      local.get $0
      i32.const 100
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/visitorState/vState
       local.tee $4
       i32.store
       block $for-continue|1
        local.get $0
        local.get $4
        i32.add
        i32.load8_u
        i32.const 255
        i32.eq
        br_if $for-continue|1
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vState
        local.tee $4
        i32.store
        local.get $0
        local.get $4
        i32.add
        i32.load8_u
        i32.const 4
        i32.eq
        br_if $for-continue|1
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vX
        local.tee $4
        i32.store
        local.get $4
        local.get $0
        i32.const 2
        i32.shl
        local.tee $7
        i32.add
        i32.load
        local.get $5
        i32.sub
        local.tee $8
        i32.const 31
        i32.shr_s
        local.set $9
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vY
        local.tee $4
        i32.store
        local.get $8
        local.get $9
        i32.add
        local.get $9
        i32.xor
        local.get $4
        local.get $7
        i32.add
        i32.load
        local.get $6
        i32.sub
        local.tee $4
        i32.const 31
        i32.shr_s
        local.tee $8
        local.get $4
        local.get $8
        i32.add
        i32.xor
        i32.add
        i32.const 2
        i32.gt_s
        br_if $for-continue|1
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vSatisfaction
        local.tee $4
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vSatisfaction
        local.tee $8
        i32.store offset=4
        local.get $4
        local.get $0
        i32.const 100
        local.get $7
        local.get $8
        i32.add
        i32.load
        i32.const 1
        i32.add
        local.tee $4
        local.get $4
        i32.const 100
        i32.gt_s
        select
        call $~lib/staticarray/StaticArray<i32>#__uset
        local.get $1
        i32.const 1
        i32.add
        local.set $1
       end
       local.get $0
       i32.const 1
       i32.add
       local.set $0
       br $for-loop|1
      end
     end
     local.get $1
     i32.const 0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
      local.tee $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
      local.tee $4
      i32.store offset=4
      local.get $0
      local.get $2
      local.get $1
      local.get $4
      local.get $2
      i32.const 2
      i32.shl
      i32.add
      i32.load
      i32.add
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/tick
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $assembly/sim/state/visitorState/tickCount
  i32.const 1
  i32.add
  global.set $assembly/sim/state/visitorState/tickCount
  global.get $assembly/sim/state/visitorState/rngState
  global.get $assembly/sim/state/visitorState/tickCount
  i32.xor
  global.set $assembly/sim/state/visitorState/rngState
  call $assembly/sim/visitors/visitors/recomputeQueueStats
  global.get $assembly/sim/state/visitorState/tickCount
  i32.const 3000
  i32.rem_s
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   loop $for-loop|0
    local.get $0
    i32.const 128
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instMonthlyRevenue
     local.tee $1
     i32.store
     local.get $1
     local.get $0
     i32.const 0
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   call $assembly/sim/employees/employees/applyMonthlyOperatingCosts
  end
  global.get $assembly/sim/state/visitorState/tickCount
  i32.const 30
  i32.rem_s
  i32.eqz
  if
   call $assembly/sim/attractions/attractions/updateAttractionBreakdowns
  end
  global.get $assembly/sim/state/visitorState/spawnCooldown
  i32.const 1
  i32.sub
  global.set $assembly/sim/state/visitorState/spawnCooldown
  global.get $assembly/sim/state/visitorState/spawnCooldown
  i32.const 0
  i32.le_s
  if
   call $assembly/sim/attractions/attractions/countActiveInstances
   local.set $0
   i32.const 5
   i32.const 30
   call $assembly/sim/visitors/visitors/getAvgSatisfaction
   i32.const 4
   i32.div_s
   i32.sub
   local.get $0
   i32.const 1
   i32.shl
   i32.sub
   i32.const 100
   global.get $assembly/sim/state/parkState/parkAttractiveness
   i32.sub
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.ge_s
   select
   i32.const 3
   i32.div_s
   i32.add
   local.tee $1
   local.get $1
   i32.const 5
   i32.lt_s
   select
   global.set $assembly/sim/state/visitorState/spawnCooldown
   global.get $assembly/sim/state/visitorState/activeVisitors
   i32.const 100
   i32.lt_s
   local.get $0
   i32.const 0
   i32.gt_s
   i32.and
   if
    call $assembly/sim/visitors/visitors/spawnVisitor
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|00
   local.get $0
   i32.const 100
   i32.lt_s
   if
    local.get $0
    call $assembly/sim/visitors/visitors/updateVisitor
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|00
   end
  end
  call $assembly/sim/visitors/visitors/recomputeQueueStats
  global.get $assembly/sim/state/visitorState/tickCount
  i32.const 10
  i32.rem_s
  i32.eqz
  if
   i32.const 0
   local.set $0
   loop $for-loop|1
    local.get $0
    i32.const 100
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 255
     i32.ne
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.load8_u
      i32.const 3
      i32.ne
     else
      i32.const 0
     end
     if
      i32.const 0
      local.set $1
      loop $for-loop|2
       local.get $1
       i32.const 3
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vNeeds
        local.tee $3
        i32.store
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vNeeds
        local.tee $2
        i32.store offset=4
        local.get $2
        local.get $0
        i32.const 6
        i32.mul
        local.get $1
        i32.add
        local.tee $4
        i32.const 2
        i32.shl
        i32.add
        i32.load
        i32.const 2
        i32.add
        local.set $2
        local.get $3
        local.get $4
        i32.const 100
        local.get $2
        local.get $2
        i32.const 100
        i32.gt_s
        select
        call $~lib/staticarray/StaticArray<i32>#__uset
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|2
       end
      end
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vSatisfaction
      local.tee $2
      i32.store offset=4
      local.get $1
      local.get $0
      local.get $2
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      i32.load
      i32.const 1
      i32.sub
      local.tee $1
      i32.const 0
      local.get $1
      i32.const 0
      i32.ge_s
      select
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|1
    end
   end
  end
  global.get $assembly/sim/state/visitorState/tickCount
  i32.const 7
  i32.and
  i32.eqz
  if
   i32.const 0
   local.set $0
   loop $for-loop|3
    local.get $0
    i32.const 100
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 255
     i32.ne
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.load8_u
      i32.const 4
      i32.ne
     else
      i32.const 0
     end
     if
      i32.const 3
      local.set $1
      loop $for-loop|4
       local.get $1
       i32.const 5
       i32.le_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $assembly/sim/state/visitorState/vNeeds
        local.tee $2
        i32.store
        local.get $2
        local.get $0
        i32.const 6
        i32.mul
        local.get $1
        i32.add
        i32.const 2
        i32.shl
        i32.add
        i32.load
        i32.const 80
        i32.ge_s
        if
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vSatisfaction
         local.tee $2
         i32.store
         global.get $~lib/memory/__stack_pointer
         global.get $assembly/sim/state/visitorState/vSatisfaction
         local.tee $3
         i32.store offset=4
         local.get $2
         local.get $0
         local.get $3
         local.get $0
         i32.const 2
         i32.shl
         i32.add
         i32.load
         i32.const 2
         i32.sub
         local.tee $2
         i32.const 0
         local.get $2
         i32.const 0
         i32.ge_s
         select
         call $~lib/staticarray/StaticArray<i32>#__uset
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|4
       end
      end
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|3
    end
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|5
   local.get $0
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.load8_u
    i32.const 255
    i32.ne
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 4
     i32.ne
    else
     i32.const 0
    end
    if
     local.get $0
     call $assembly/sim/visitors/visitors/shouldLeave
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vState
      local.tee $1
      i32.store
      local.get $0
      local.get $1
      i32.add
      i32.const 4
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTimer
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 20
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vTarget
      local.tee $1
      i32.store
      local.get $1
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.tee $1
      i32.const 0
      i32.ge_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/attractionState/instCurrentRiders
       local.tee $2
       i32.store
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/attractionState/instCurrentRiders
       local.tee $3
       i32.store offset=4
       local.get $2
       local.get $1
       local.get $3
       local.get $1
       i32.const 2
       i32.shl
       i32.add
       i32.load
       i32.const 1
       i32.sub
       local.tee $1
       i32.const 0
       local.get $1
       i32.const 0
       i32.ge_s
       select
       call $~lib/staticarray/StaticArray<i32>#__uset
      end
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|5
   end
  end
  global.get $assembly/sim/state/visitorState/tickCount
  i32.const 20
  i32.rem_s
  i32.eqz
  if
   i32.const 0
   local.set $0
   loop $for-loop|6
    local.get $0
    i32.const 100
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vState
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 255
     i32.ne
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vExcitement
      local.tee $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/visitorState/vExcitement
      local.tee $2
      i32.store offset=4
      local.get $1
      local.get $0
      local.get $2
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      i32.load
      i32.const 1
      i32.sub
      local.tee $1
      i32.const 0
      local.get $1
      i32.const 0
      i32.ge_s
      select
      call $~lib/staticarray/StaticArray<i32>#__uset
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|6
    end
   end
   i32.const 100
   global.get $assembly/sim/state/parkState/parkAttractiveness
   i32.const 1
   i32.add
   local.tee $0
   local.get $0
   i32.const 100
   i32.gt_s
   select
   global.set $assembly/sim/state/parkState/parkAttractiveness
  end
  call $assembly/sim/behavior/employeeBehavior/updateSecurity
  call $assembly/sim/behavior/employeeBehavior/updateMechanics
  call $assembly/sim/behavior/employeeBehavior/updateCleaners
  call $assembly/sim/behavior/employeeBehavior/updateEntertainers
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/behavior/employeeBehavior/hasSecurityNearby (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0 (result i32)
   loop $for-loop|0
    local.get $3
    global.get $assembly/sim/state/employeeState/securityCount
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/securityActive
     local.tee $4
     i32.store
     local.get $3
     local.get $4
     i32.add
     i32.load8_u
     i32.const 1
     i32.eq
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityX
      local.tee $4
      i32.store
      local.get $4
      local.get $3
      i32.const 2
      i32.shl
      local.tee $6
      i32.add
      i32.load
      local.get $0
      i32.sub
      local.tee $4
      i32.const 31
      i32.shr_s
      local.set $7
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityY
      local.tee $5
      i32.store
      i32.const 1
      local.get $4
      local.get $7
      i32.add
      local.get $7
      i32.xor
      local.get $5
      local.get $6
      i32.add
      i32.load
      local.get $1
      i32.sub
      local.tee $4
      i32.const 31
      i32.shr_s
      local.tee $5
      local.get $4
      local.get $5
      i32.add
      i32.xor
      i32.add
      local.get $2
      i32.le_s
      br_if $folding-inner0
      drop
     end
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|0
    end
   end
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/tileAt (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 255
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/gridData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_u
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/getTileHeight (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_u
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/getTileSlopeMask (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/cornerMaskData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_u
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/getUpperPathVariant (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/upperPathVariantData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_s
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/getUpperPathHeight (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/upperPathHeightData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_u
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/getRampDirection (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/rampDirData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_s
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/getUpperRampDirection (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/upperRampDirData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_s
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/canPlace (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   i32.or
   i32.const 0
   i32.lt_s
   local.get $0
   local.get $2
   i32.add
   i32.const 50
   i32.gt_s
   i32.or
   local.get $1
   local.get $3
   i32.add
   i32.const 50
   i32.gt_s
   i32.or
   br_if $folding-inner0
   i32.const 1073741824
   local.set $4
   i32.const -1
   local.set $5
   loop $for-loop|0
    local.get $3
    local.get $7
    i32.gt_s
    if
     i32.const 0
     local.set $6
     loop $for-loop|1
      local.get $2
      local.get $6
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/gridState/gridData
       local.tee $8
       i32.store
       local.get $0
       local.get $6
       i32.add
       local.get $1
       local.get $7
       i32.add
       i32.const 50
       i32.mul
       i32.add
       local.tee $9
       local.get $8
       i32.add
       i32.load8_u
       call $assembly/sim/grid/gridOps/isLandTile
       i32.eqz
       br_if $folding-inner0
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/gridState/heightData
       local.tee $8
       i32.store
       local.get $4
       local.get $8
       local.get $9
       i32.add
       i32.load8_u
       local.tee $8
       local.get $4
       local.get $8
       i32.lt_s
       select
       local.set $4
       local.get $5
       local.get $8
       local.get $5
       local.get $8
       i32.gt_s
       select
       local.set $5
       local.get $8
       global.get $assembly/sim/state/gridState/TERRAIN_MAX_BUILD_HEIGHT
       i32.gt_s
       br_if $folding-inner0
       local.get $6
       i32.const 1
       i32.add
       local.set $6
       br $for-loop|1
      end
     end
     local.get $7
     i32.const 1
     i32.add
     local.set $7
     br $for-loop|0
    end
   end
   local.get $5
   local.get $4
   i32.sub
   i32.const 1
   i32.gt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/noise/dot2 (param $0 i32) (param $1 f64) (param $2 f64) (result f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 1568
  i32.store
  local.get $0
  i32.const 3
  i32.shl
  local.tee $0
  i32.const 1568
  i32.add
  f64.load
  local.get $1
  f64.mul
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 1696
  i32.store
  local.get $1
  local.get $0
  i32.const 1696
  i32.add
  f64.load
  local.get $2
  f64.mul
  f64.add
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/sim/noise/simplex2 (param $0 f64) (param $1 f64) (result f64)
  (local $2 i32)
  (local $3 i32)
  (local $4 f64)
  (local $5 f64)
  (local $6 i32)
  (local $7 i32)
  (local $8 f64)
  (local $9 f64)
  (local $10 f64)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $assembly/sim/noise/noiseInitialized
  i32.eqz
  if
   i32.const 1
   global.set $assembly/sim/noise/noiseInitialized
   loop $for-loop|0
    local.get $2
    i32.const 512
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/noise/perm
     local.tee $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     i32.const 1824
     i32.store offset=4
     local.get $6
     local.get $2
     local.get $2
     i32.const 255
     i32.and
     i32.const 2
     i32.shl
     i32.const 1824
     i32.add
     i32.load
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/noise/permMod12
     local.tee $6
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/noise/perm
     local.tee $7
     i32.store offset=4
     local.get $6
     local.get $2
     local.get $7
     local.get $2
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 12
     i32.rem_s
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|0
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
  local.get $0
  local.get $0
  local.get $1
  f64.add
  global.get $assembly/sim/noise/F2
  f64.mul
  local.tee $0
  f64.add
  f64.floor
  i32.trunc_sat_f64_s
  local.tee $2
  f64.convert_i32_s
  local.get $1
  local.get $0
  f64.add
  f64.floor
  i32.trunc_sat_f64_s
  local.tee $6
  local.get $2
  i32.add
  f64.convert_i32_s
  global.get $assembly/sim/noise/G2
  f64.mul
  local.tee $0
  f64.sub
  f64.sub
  local.tee $8
  local.get $1
  local.get $6
  f64.convert_i32_s
  local.get $0
  f64.sub
  f64.sub
  local.tee $9
  f64.gt
  if (result i32)
   i32.const 1
  else
   i32.const 1
   local.set $3
   i32.const 0
  end
  local.set $7
  local.get $8
  local.get $7
  f64.convert_i32_s
  f64.sub
  global.get $assembly/sim/noise/G2
  f64.add
  local.set $4
  local.get $9
  local.get $3
  f64.convert_i32_s
  f64.sub
  global.get $assembly/sim/noise/G2
  f64.add
  local.set $10
  local.get $8
  f64.const -1
  f64.add
  global.get $assembly/sim/noise/G2
  global.get $assembly/sim/noise/G2
  f64.add
  local.tee $5
  f64.add
  local.set $0
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/noise/permMod12
  local.tee $11
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/noise/perm
  local.tee $12
  i32.store offset=4
  local.get $11
  local.get $2
  i32.const 255
  i32.and
  local.tee $11
  local.get $12
  local.get $6
  i32.const 255
  i32.and
  local.tee $6
  i32.const 2
  i32.shl
  i32.add
  i32.load
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $12
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/noise/permMod12
  local.tee $13
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/noise/perm
  local.tee $2
  i32.store offset=4
  local.get $13
  local.get $2
  local.get $3
  local.get $6
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.get $7
  local.get $11
  i32.add
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/noise/permMod12
  local.tee $3
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/noise/perm
  local.tee $7
  i32.store offset=4
  local.get $3
  local.get $7
  local.get $6
  i32.const 1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.get $11
  i32.const 1
  i32.add
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $3
  f64.const 0.5
  local.get $8
  local.get $8
  f64.mul
  f64.sub
  local.get $9
  local.get $9
  f64.mul
  f64.sub
  local.tee $1
  f64.const 0
  f64.ge
  if (result f64)
   local.get $1
   local.get $1
   f64.mul
   local.tee $1
   local.get $1
   f64.mul
   local.get $12
   local.get $8
   local.get $9
   call $assembly/sim/noise/dot2
   f64.mul
  else
   f64.const 0
  end
  local.set $1
  f64.const 0.5
  local.get $4
  local.get $4
  f64.mul
  f64.sub
  local.get $10
  local.get $10
  f64.mul
  f64.sub
  local.tee $8
  f64.const 0
  f64.ge
  if (result f64)
   local.get $8
   local.get $8
   f64.mul
   local.tee $8
   local.get $8
   f64.mul
   local.get $2
   local.get $4
   local.get $10
   call $assembly/sim/noise/dot2
   f64.mul
  else
   f64.const 0
  end
  local.set $4
  f64.const 0.5
  local.get $0
  local.get $0
  f64.mul
  f64.sub
  local.get $9
  f64.const -1
  f64.add
  local.get $5
  f64.add
  local.tee $5
  local.get $5
  f64.mul
  f64.sub
  local.tee $8
  f64.const 0
  f64.ge
  if (result f64)
   local.get $8
   local.get $8
   f64.mul
   local.tee $8
   local.get $8
   f64.mul
   local.get $3
   local.get $0
   local.get $5
   call $assembly/sim/noise/dot2
   f64.mul
  else
   f64.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
  local.get $4
  f64.add
  local.get $0
  f64.add
  f64.const 70
  f64.mul
 )
 (func $assembly/sim/grid/gridOps/recomputeSlopeMask (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.tee $6
  local.get $2
  i32.add
  i32.load8_u
  local.set $2
  local.get $1
  i32.const 0
  i32.gt_s
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $3
   i32.store
   local.get $1
   i32.const 1
   i32.sub
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $3
   i32.add
   i32.load8_u
  else
   local.get $2
  end
  local.set $3
  local.get $1
  i32.const 49
  i32.lt_s
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $4
   i32.store
   local.get $1
   i32.const 1
   i32.add
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $4
   i32.add
   i32.load8_u
  else
   local.get $2
  end
  local.set $4
  local.get $2
  local.get $0
  i32.const 0
  i32.gt_s
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $5
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   i32.const 1
   i32.sub
   local.get $5
   i32.add
   i32.load8_u
  else
   local.get $2
  end
  local.tee $5
  i32.gt_s
  local.tee $7
  local.get $2
  local.get $3
  i32.gt_s
  local.tee $8
  i32.or
  local.tee $9
  i32.const 2
  i32.or
  local.get $9
  local.get $0
  i32.const 49
  i32.lt_s
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $9
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   i32.const 1
   i32.add
   local.get $9
   i32.add
   i32.load8_u
  else
   local.get $2
  end
  local.tee $0
  local.get $2
  i32.lt_s
  local.tee $1
  local.get $8
  i32.or
  select
  local.tee $8
  i32.const 4
  i32.or
  local.get $8
  local.get $2
  local.get $4
  i32.gt_s
  local.tee $8
  local.get $1
  i32.or
  select
  local.set $1
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/cornerMaskData
  local.tee $9
  i32.store
  local.get $6
  local.get $9
  i32.add
  i32.const 0
  local.get $1
  i32.const 8
  i32.or
  local.get $1
  local.get $7
  local.get $8
  i32.or
  select
  local.get $2
  local.get $4
  i32.eq
  local.get $2
  local.get $3
  i32.eq
  i32.and
  local.get $2
  local.get $5
  i32.eq
  i32.and
  local.get $0
  local.get $2
  i32.eq
  i32.and
  select
  i32.store8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/terrain/terrainGen/generateTerrain (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 f64)
  (local $4 f64)
  (local $5 f64)
  (local $6 f64)
  (local $7 f64)
  (local $8 i32)
  (local $9 f64)
  (local $10 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  f64.convert_i32_s
  f64.const 0.001
  f64.mul
  local.set $7
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $0
   i32.const 50
   i32.lt_s
   if
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $2
     i32.const 50
     i32.lt_s
     if
      local.get $2
      i32.const 25
      i32.sub
      local.tee $1
      i32.const -4
      i32.ge_s
      local.get $0
      i32.const 47
      i32.ge_s
      i32.and
      local.get $1
      i32.const 4
      i32.le_s
      i32.and
      i32.eqz
      if
       local.get $0
       i32.const 50
       i32.mul
       local.get $2
       i32.add
       local.set $8
       local.get $2
       f64.convert_i32_s
       f64.const 50
       f64.div
       f64.const 4
       f64.mul
       local.get $7
       f64.add
       local.set $9
       local.get $0
       f64.convert_i32_s
       f64.const 50
       f64.div
       f64.const 4
       f64.mul
       local.get $7
       f64.const 1.37
       f64.mul
       f64.add
       local.set $10
       f64.const 0
       local.set $5
       f64.const 1
       local.set $4
       f64.const 1
       local.set $3
       f64.const 0
       local.set $6
       i32.const 0
       local.set $1
       loop $for-loop|00
        local.get $1
        i32.const 2
        i32.lt_s
        if
         local.get $5
         local.get $9
         local.get $3
         f64.mul
         local.get $10
         local.get $3
         f64.mul
         call $assembly/sim/noise/simplex2
         local.get $4
         f64.mul
         f64.add
         local.set $5
         local.get $6
         local.get $4
         f64.add
         local.set $6
         local.get $4
         f64.const 0.5
         f64.mul
         local.set $4
         local.get $3
         local.get $3
         f64.add
         local.set $3
         local.get $1
         i32.const 1
         i32.add
         local.set $1
         br $for-loop|00
        end
       end
       global.get $~lib/memory/__stack_pointer
       global.get $assembly/sim/state/gridState/heightData
       local.tee $1
       i32.store
       local.get $1
       local.get $8
       i32.add
       global.get $assembly/sim/state/gridState/TERRAIN_BASE_HEIGHT
       local.get $5
       local.get $6
       f64.div
       f64.const 2
       f64.mul
       local.tee $3
       f64.ceil
       local.get $3
       f64.ceil
       f64.const -0.5
       f64.add
       local.get $3
       f64.gt
       f64.convert_i32_u
       f64.sub
       i32.trunc_sat_f64_s
       i32.add
       local.tee $1
       i32.const 0
       i32.lt_s
       if
        i32.const 0
        local.set $1
       end
       global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
       local.get $1
       local.get $1
       global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
       i32.gt_s
       select
       i32.store8
      end
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|2
   local.get $0
   i32.const 50
   i32.lt_s
   if
    i32.const 0
    local.set $2
    loop $for-loop|3
     local.get $2
     i32.const 50
     i32.lt_s
     if
      local.get $2
      local.get $0
      call $assembly/sim/grid/gridOps/recomputeSlopeMask
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|3
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|2
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/configureAttraction (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (param $6 i32) (param $7 i32) (param $8 i32) (param $9 i32) (param $10 i32) (param $11 i32)
  (local $12 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 20
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplFootprintW
  local.tee $12
  i32.store
  local.get $12
  local.get $0
  local.get $1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplFootprintH
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $2
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplBuildPrice
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $3
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplTicketPrice
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $4
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplCapacity
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $5
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplCategory
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $6
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplAppeal
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $7
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplRideTicks
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $8
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplMonthlyCost
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $9
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplRequiredExcitement
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $10
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplNauseaGain
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $11
  i32.const 0
  local.get $11
  i32.const 0
  i32.ge_s
  select
  call $~lib/staticarray/StaticArray<i32>#__uset
  local.get $0
  global.get $assembly/sim/state/attractionState/templateCount
  i32.ge_s
  if
   local.get $0
   i32.const 1
   i32.add
   global.set $assembly/sim/state/attractionState/templateCount
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/getTmplFootprintW (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplFootprintW
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getTmplFootprintH (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplFootprintH
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getTmplBuildPrice (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplBuildPrice
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getTmplTicketPrice (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplTicketPrice
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getTmplCapacity (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplCapacity
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getTmplCategory (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplCategory
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getTmplAppeal (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplAppeal
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstTemplateId (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTemplateId
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstRotation (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instRotation
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/isInstActive (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instActive
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstTicketPrice (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTicketPrice
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstRiders (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instCurrentRiders
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstEntranceX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instEntranceX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstEntranceY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instEntranceY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstExitX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instExitX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstExitY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instExitY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstQueueLength (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instQueueLength
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstWaitTicks (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instEstimatedWaitTicks
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstPopularity (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instPopularity
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstCapacity (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 128
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instCapacity
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
  i32.const 0
  local.get $0
  i32.const 0
  i32.ge_s
  select
 )
 (func $assembly/sim/attractions/attractions/getInstCategory (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 128
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplCategory
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstAppeal (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 128
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.const 20
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplAppeal
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstBroken (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instBroken
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstRepairTicks (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instRepairTicks
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstTotalVisitors (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTotalVisitors
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstTotalRevenue (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTotalRevenue
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/getInstMonthlyRevenue (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instMonthlyRevenue
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/setInstTicketPrice (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 128
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTicketPrice
   local.tee $2
   i32.store
   local.get $2
   local.get $0
   local.get $1
   call $~lib/staticarray/StaticArray<i32>#__uset
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/setInstCapacity (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 128
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instCapacity
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  local.get $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.ge_s
  select
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instCurrentRiders
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $1
  i32.add
  i32.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instCapacity
  local.tee $3
  i32.store
  local.get $2
  local.get $1
  local.get $3
  i32.add
  i32.load
  i32.gt_s
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instCurrentRiders
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instCapacity
   local.tee $3
   i32.store offset=4
   local.get $2
   local.get $0
   local.get $1
   local.get $3
   i32.add
   i32.load
   call $~lib/staticarray/StaticArray<i32>#__uset
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/footprintWForRotation (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplFootprintW
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.tee $2
  i32.add
  i32.load
  local.set $3
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplFootprintH
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.add
  i32.load
  local.get $3
  local.get $1
  i32.const 270
  i32.eq
  local.get $1
  i32.const 90
  i32.eq
  i32.or
  select
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/instFootprintW (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $1
  i32.add
  i32.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instRotation
  local.tee $0
  i32.store
  local.get $2
  local.get $0
  local.get $1
  i32.add
  i32.load
  call $assembly/sim/attractions/attractions/footprintWForRotation
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/footprintHForRotation (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplFootprintW
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.tee $2
  i32.add
  i32.load
  local.set $3
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/tmplFootprintH
  local.tee $0
  i32.store
  local.get $3
  local.get $0
  local.get $2
  i32.add
  i32.load
  local.get $1
  i32.const 270
  i32.eq
  local.get $1
  i32.const 90
  i32.eq
  i32.or
  select
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/instFootprintH (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instTemplateId
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 2
  i32.shl
  local.tee $1
  i32.add
  i32.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instRotation
  local.tee $0
  i32.store
  local.get $2
  local.get $0
  local.get $1
  i32.add
  i32.load
  call $assembly/sim/attractions/attractions/footprintHForRotation
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/attractions/attractions/applyInstanceEndpoints (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instEntranceX
  local.tee $5
  i32.store
  local.get $5
  local.get $0
  local.get $1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instEntranceY
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $2
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instExitX
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $3
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/attractionState/instExitY
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  local.get $4
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/setInstEndpoints (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (result i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 128
   i32.ge_s
   i32.or
   if (result i32)
    i32.const 1
   else
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $5
    i32.store
    local.get $0
    local.get $5
    i32.add
    i32.load8_u
    i32.const 1
    i32.ne
   end
   local.get $2
   local.get $4
   i32.eq
   local.get $1
   local.get $3
   i32.eq
   i32.and
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instX
   local.tee $5
   i32.store
   local.get $5
   local.get $0
   i32.const 2
   i32.shl
   local.tee $6
   i32.add
   i32.load
   local.set $7
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instY
   local.tee $5
   i32.store
   local.get $5
   local.get $6
   i32.add
   i32.load
   local.set $8
   local.get $0
   call $assembly/sim/attractions/attractions/instFootprintW
   local.set $9
   local.get $0
   call $assembly/sim/attractions/attractions/instFootprintH
   local.set $5
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTemplateId
   local.tee $10
   i32.store
   local.get $1
   local.get $2
   local.get $7
   local.get $8
   local.get $9
   local.get $5
   local.get $6
   local.get $10
   i32.add
   i32.load
   local.tee $6
   call $assembly/sim/attractions/attractions/isEndpointValidForPlacement
   i32.eqz
   br_if $folding-inner0
   local.get $3
   local.get $4
   local.get $7
   local.get $8
   local.get $9
   local.get $5
   local.get $6
   call $assembly/sim/attractions/attractions/isEndpointValidForPlacement
   i32.eqz
   br_if $folding-inner0
   local.get $0
   local.get $1
   local.get $2
   local.get $3
   local.get $4
   call $assembly/sim/attractions/attractions/applyInstanceEndpoints
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/attractions/attractions/instanceAtTile (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 0
   i32.lt_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $2
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $2
   i32.add
   i32.load8_u
   local.tee $0
   i32.const 32
   i32.lt_u
   br_if $folding-inner0
   local.get $0
   i32.const 32
   i32.sub
   i32.const 255
   i32.and
   local.tee $0
   i32.const 128
   i32.lt_u
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.load8_u
    i32.const 1
    i32.eq
   else
    i32.const 0
   end
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/attractions/attractions/getBrokenAttractionCount (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/attractionState/instActive
    local.tee $2
    i32.store
    local.get $1
    i32.const 1
    i32.add
    local.get $1
    local.get $0
    local.get $2
    i32.add
    i32.load8_u
    i32.const 1
    i32.eq
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/attractionState/instBroken
     local.tee $1
     i32.store
     local.get $0
     local.get $1
     i32.add
     i32.load8_u
     i32.const 1
     i32.eq
    else
     i32.const 0
    end
    select
    local.set $1
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/sim/attractions/attractions/placeAttractionRotated (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $folding-inner0
   local.get $0
   i32.const 0
   i32.lt_s
   local.get $0
   global.get $assembly/sim/state/attractionState/templateCount
   i32.ge_s
   i32.or
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.const 128
   i32.ge_s
   i32.or
   br_if $folding-inner0
   local.get $1
   local.get $2
   local.get $0
   local.get $3
   call $assembly/sim/attractions/attractions/normalizeRotation
   local.tee $7
   call $assembly/sim/attractions/attractions/footprintWForRotation
   local.tee $4
   local.get $0
   local.get $7
   call $assembly/sim/attractions/attractions/footprintHForRotation
   local.tee $5
   call $assembly/sim/grid/gridOps/canPlace
   i32.eqz
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplBuildPrice
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   i32.const 2
   i32.shl
   local.tee $3
   i32.add
   i32.load
   call $assembly/sim/economy/economy/spend
   i32.eqz
   br_if $folding-inner0
   global.get $assembly/sim/state/attractionState/instanceCount
   local.set $6
   global.get $assembly/sim/state/attractionState/instanceCount
   i32.const 1
   i32.add
   global.set $assembly/sim/state/attractionState/instanceCount
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTemplateId
   local.tee $8
   i32.store
   local.get $8
   local.get $6
   local.get $0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instX
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   local.get $1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instY
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   local.get $2
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instRotation
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   local.get $7
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instActive
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.add
   i32.const 1
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTicketPrice
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplTicketPrice
   local.tee $7
   i32.store offset=4
   local.get $0
   local.get $6
   local.get $3
   local.get $7
   i32.add
   i32.load
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instCapacity
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplCapacity
   local.tee $7
   i32.store offset=4
   local.get $0
   local.get $6
   local.get $3
   local.get $7
   i32.add
   i32.load
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instCurrentRiders
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   local.get $6
   local.get $1
   local.get $2
   local.get $4
   local.get $5
   call $assembly/sim/attractions/attractions/findDefaultEndpoint
   local.tee $0
   i32.const 65535
   i32.and
   local.tee $7
   local.get $0
   i32.const 16
   i32.shr_s
   i32.const 65535
   i32.and
   local.tee $0
   local.get $7
   local.get $0
   call $assembly/sim/attractions/attractions/applyInstanceEndpoints
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instBuildTick
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   global.get $assembly/sim/state/visitorState/tickCount
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instBroken
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.add
   i32.const 0
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instRepairTicks
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTotalVisitors
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instTotalRevenue
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instMonthlyRevenue
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instQueueLength
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instEstimatedWaitTicks
   local.tee $0
   i32.store
   local.get $0
   local.get $6
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/instPopularity
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/attractionState/tmplAppeal
   local.tee $7
   i32.store offset=4
   local.get $0
   local.get $6
   local.get $3
   local.get $7
   i32.add
   i32.load
   call $~lib/staticarray/StaticArray<i32>#__uset
   local.get $6
   i32.const 32
   i32.add
   local.set $7
   i32.const 0
   local.set $0
   loop $for-loop|0
    local.get $0
    local.get $5
    i32.lt_s
    if
     i32.const 0
     local.set $3
     loop $for-loop|1
      local.get $3
      local.get $4
      i32.lt_s
      if
       local.get $1
       local.get $3
       i32.add
       local.get $0
       local.get $2
       i32.add
       local.get $7
       call $assembly/sim/grid/gridOps/setTile
       local.get $3
       i32.const 1
       i32.add
       local.set $3
       br $for-loop|1
      end
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $6
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/grid/gridOps/isPathOrEntrance (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/gridData
  local.tee $2
  i32.store
  i32.const 1
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_u
  local.tee $0
  i32.const 9
  i32.eq
  local.get $0
  call $assembly/sim/grid/gridOps/isPathTile
  select
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/grid/gridOps/recomputeRamp (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/gridData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.tee $4
  local.get $2
  i32.add
  i32.load8_u
  local.tee $2
  call $assembly/sim/grid/gridOps/isPathTile
  i32.eqz
  local.get $2
  i32.const 9
  i32.ne
  i32.and
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/rampDirData
   local.tee $0
   i32.store
   local.get $0
   local.get $4
   i32.add
   i32.const 0
   i32.store8
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $2
  i32.store
  local.get $2
  local.get $4
  i32.add
  i32.load8_u
  local.set $5
  local.get $1
  i32.const 0
  i32.gt_s
  if (result i32)
   local.get $0
   local.get $1
   i32.const 1
   i32.sub
   call $assembly/sim/grid/gridOps/isPathOrEntrance
  else
   i32.const 0
  end
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $2
   i32.store
   local.get $1
   i32.const 1
   i32.sub
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $2
   i32.add
   i32.load8_u
   local.get $5
   i32.const 1
   i32.add
   i32.eq
   if (result i32)
    i32.const 1
    local.set $3
    i32.const 1
   else
    i32.const 0
   end
  else
   i32.const 0
  end
  local.set $2
  local.get $0
  i32.const 49
  i32.lt_s
  if (result i32)
   local.get $0
   i32.const 1
   i32.add
   local.get $1
   call $assembly/sim/grid/gridOps/isPathOrEntrance
  else
   i32.const 0
  end
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $6
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   i32.const 1
   i32.add
   local.get $6
   i32.add
   i32.load8_u
   local.get $5
   i32.const 1
   i32.add
   i32.eq
   if
    i32.const 2
    local.set $3
    local.get $2
    i32.const 1
    i32.add
    local.set $2
   end
  end
  local.get $1
  i32.const 49
  i32.lt_s
  if (result i32)
   local.get $0
   local.get $1
   i32.const 1
   i32.add
   call $assembly/sim/grid/gridOps/isPathOrEntrance
  else
   i32.const 0
  end
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $6
   i32.store
   local.get $1
   i32.const 1
   i32.add
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $6
   i32.add
   i32.load8_u
   local.get $5
   i32.const 1
   i32.add
   i32.eq
   if
    i32.const 3
    local.set $3
    local.get $2
    i32.const 1
    i32.add
    local.set $2
   end
  end
  local.get $0
  i32.const 0
  i32.gt_s
  if (result i32)
   local.get $0
   i32.const 1
   i32.sub
   local.get $1
   call $assembly/sim/grid/gridOps/isPathOrEntrance
  else
   i32.const 0
  end
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $6
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   i32.const 1
   i32.sub
   local.get $6
   i32.add
   i32.load8_u
   local.get $5
   i32.const 1
   i32.add
   i32.eq
   if
    i32.const 4
    local.set $3
    local.get $2
    i32.const 1
    i32.add
    local.set $2
   end
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/rampDirData
  local.tee $0
  i32.store
  local.get $0
  local.get $4
  i32.add
  local.get $3
  i32.const 0
  local.get $2
  i32.const 1
  i32.eq
  select
  i32.store8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/grid/gridOps/recomputeUpperRamp (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/upperPathVariantData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.tee $4
  local.get $2
  i32.add
  i32.load8_s
  i32.const 0
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/upperRampDirData
   local.tee $0
   i32.store
   local.get $0
   local.get $4
   i32.add
   i32.const 0
   i32.store8
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/upperPathHeightData
  local.tee $2
  i32.store
  local.get $2
  local.get $4
  i32.add
  i32.load8_u
  local.set $5
  local.get $1
  i32.const 0
  i32.gt_s
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/upperPathVariantData
   local.tee $2
   i32.store
   local.get $1
   i32.const 1
   i32.sub
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.tee $6
   local.get $2
   i32.add
   i32.load8_s
   i32.const 0
   i32.ge_s
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathHeightData
    local.tee $2
    i32.store
    local.get $2
    local.get $6
    i32.add
    i32.load8_u
    local.get $5
    i32.const 1
    i32.add
    i32.eq
    if (result i32)
     i32.const 1
     local.set $3
     i32.const 1
    else
     i32.const 0
    end
   else
    i32.const 0
   end
  else
   i32.const 0
  end
  local.set $2
  local.get $0
  i32.const 49
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/upperPathVariantData
   local.tee $6
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   i32.const 1
   i32.add
   local.tee $7
   local.get $6
   i32.add
   i32.load8_s
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathHeightData
    local.tee $6
    i32.store
    local.get $6
    local.get $7
    i32.add
    i32.load8_u
    local.get $5
    i32.const 1
    i32.add
    i32.eq
    if (result i32)
     i32.const 2
     local.set $3
     local.get $2
     i32.const 1
     i32.add
    else
     local.get $2
    end
    local.set $2
   end
  end
  local.get $1
  i32.const 49
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/upperPathVariantData
   local.tee $6
   i32.store
   local.get $1
   i32.const 1
   i32.add
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.tee $7
   local.get $6
   i32.add
   i32.load8_s
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathHeightData
    local.tee $6
    i32.store
    local.get $6
    local.get $7
    i32.add
    i32.load8_u
    local.get $5
    i32.const 1
    i32.add
    i32.eq
    if (result i32)
     i32.const 3
     local.set $3
     local.get $2
     i32.const 1
     i32.add
    else
     local.get $2
    end
    local.set $2
   end
  end
  local.get $0
  i32.const 0
  i32.gt_s
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/upperPathVariantData
   local.tee $6
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   i32.const 1
   i32.sub
   local.tee $0
   local.get $6
   i32.add
   i32.load8_s
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathHeightData
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.load8_u
    local.get $5
    i32.const 1
    i32.add
    i32.eq
    if (result i32)
     i32.const 4
     local.set $3
     local.get $2
     i32.const 1
     i32.add
    else
     local.get $2
    end
    local.set $2
   end
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/upperRampDirData
  local.tee $0
  i32.store
  local.get $0
  local.get $4
  i32.add
  local.get $3
  i32.const 0
  local.get $2
  i32.const 1
  i32.eq
  select
  i32.store8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/grid/gridOps/recomputePathLevelRamp (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 0
   i32.lt_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   local.get $2
   i32.const 0
   i32.lt_s
   local.get $2
   i32.const 9
   i32.ge_s
   i32.or
   i32.or
   br_if $folding-inner0
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/behavior/navigation/nodeIndex
   local.set $5
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/pathLevelData
   local.tee $3
   i32.store
   local.get $3
   local.get $5
   i32.add
   i32.load8_s
   i32.const 0
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelRampData
    local.tee $0
    i32.store
    local.get $0
    local.get $5
    i32.add
    i32.const 0
    i32.store8
    br $folding-inner0
   end
   local.get $2
   i32.const 1
   i32.add
   local.tee $3
   i32.const 9
   i32.lt_s
   local.get $1
   i32.const 0
   i32.gt_s
   i32.and
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $6
    i32.store
    local.get $0
    local.get $1
    i32.const 1
    i32.sub
    local.get $3
    call $assembly/sim/behavior/navigation/nodeIndex
    local.get $6
    i32.add
    i32.load8_s
    i32.const 0
    i32.ge_s
    if (result i32)
     i32.const 1
     local.set $4
     i32.const 1
    else
     i32.const 0
    end
   else
    i32.const 0
   end
   local.set $3
   local.get $2
   i32.const 1
   i32.add
   local.tee $6
   i32.const 9
   i32.lt_s
   local.get $0
   i32.const 49
   i32.lt_s
   i32.and
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $7
    i32.store
    local.get $0
    i32.const 1
    i32.add
    local.get $1
    local.get $6
    call $assembly/sim/behavior/navigation/nodeIndex
    local.get $7
    i32.add
    i32.load8_s
    i32.const 0
    i32.ge_s
    if
     i32.const 2
     local.set $4
     local.get $3
     i32.const 1
     i32.add
     local.set $3
    end
   end
   local.get $2
   i32.const 1
   i32.add
   local.tee $6
   i32.const 9
   i32.lt_s
   local.get $1
   i32.const 49
   i32.lt_s
   i32.and
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $7
    i32.store
    local.get $0
    local.get $1
    i32.const 1
    i32.add
    local.get $6
    call $assembly/sim/behavior/navigation/nodeIndex
    local.get $7
    i32.add
    i32.load8_s
    i32.const 0
    i32.ge_s
    if
     i32.const 3
     local.set $4
     local.get $3
     i32.const 1
     i32.add
     local.set $3
    end
   end
   local.get $2
   i32.const 1
   i32.add
   local.tee $2
   i32.const 9
   i32.lt_s
   local.get $0
   i32.const 0
   i32.gt_s
   i32.and
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $6
    i32.store
    local.get $0
    i32.const 1
    i32.sub
    local.get $1
    local.get $2
    call $assembly/sim/behavior/navigation/nodeIndex
    local.get $6
    i32.add
    i32.load8_s
    i32.const 0
    i32.ge_s
    if
     i32.const 4
     local.set $4
     local.get $3
     i32.const 1
     i32.add
     local.set $3
    end
   end
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/pathLevelRampData
   local.tee $0
   i32.store
   local.get $0
   local.get $5
   i32.add
   local.get $4
   i32.const 0
   local.get $3
   i32.const 1
   i32.eq
   select
   i32.store8
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/attractions/attractions/demolish (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   block $folding-inner0
    local.get $0
    local.get $1
    i32.or
    i32.const 0
    i32.lt_s
    local.get $0
    i32.const 50
    i32.ge_s
    i32.or
    local.get $1
    i32.const 50
    i32.ge_s
    i32.or
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $3
    i32.store
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.get $3
    i32.add
    i32.load8_u
    local.tee $3
    i32.eqz
    local.get $3
    i32.const 9
    i32.eq
    i32.or
    br_if $folding-inner0
    local.get $3
    i32.const 32
    i32.ge_u
    if
     local.get $3
     i32.const 32
     i32.sub
     i32.const 255
     i32.and
     local.tee $6
     i32.const 128
     i32.lt_u
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instActive
      local.tee $3
      i32.store
      local.get $3
      local.get $6
      i32.add
      i32.load8_u
      i32.const 1
      i32.eq
     else
      i32.const 0
     end
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instX
      local.tee $3
      i32.store
      local.get $3
      local.get $6
      i32.const 2
      i32.shl
      local.tee $3
      i32.add
      i32.load
      local.set $7
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instY
      local.tee $4
      i32.store
      local.get $3
      local.get $4
      i32.add
      i32.load
      local.set $8
      local.get $6
      call $assembly/sim/attractions/attractions/instFootprintW
      local.set $4
      local.get $6
      call $assembly/sim/attractions/attractions/instFootprintH
      local.set $5
      loop $for-loop|0
       local.get $2
       local.get $5
       i32.lt_s
       if
        i32.const 0
        local.set $3
        loop $for-loop|1
         local.get $3
         local.get $4
         i32.lt_s
         if
          local.get $3
          local.get $7
          i32.add
          local.get $2
          local.get $8
          i32.add
          i32.const 0
          call $assembly/sim/grid/gridOps/setTile
          local.get $3
          i32.const 1
          i32.add
          local.set $3
          br $for-loop|1
         end
        end
        local.get $2
        i32.const 1
        i32.add
        local.set $2
        br $for-loop|0
       end
      end
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instActive
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.add
      i32.const 0
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instRotation
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instCapacity
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instCurrentRiders
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instEntranceX
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instEntranceY
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instExitX
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instExitY
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const -1
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instBroken
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.add
      i32.const 0
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instRepairTicks
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instTotalVisitors
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instTotalRevenue
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instMonthlyRevenue
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instQueueLength
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instEstimatedWaitTicks
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instPopularity
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 0
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/instTemplateId
      local.tee $2
      i32.store
      local.get $2
      local.get $6
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.set $2
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/attractionState/tmplBuildPrice
      local.tee $3
      i32.store
      local.get $3
      local.get $2
      i32.const 2
      i32.shl
      i32.add
      i32.load
      i32.const 2
      i32.div_s
      call $assembly/sim/economy/economy/earn
     end
    else
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/upperPathVariantData
     local.tee $2
     i32.store
     local.get $1
     i32.const 50
     i32.mul
     local.get $0
     i32.add
     local.tee $3
     local.get $2
     i32.add
     i32.load8_s
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/upperPathHeightData
      local.tee $2
      i32.store
      local.get $2
      local.get $3
      i32.add
      i32.load8_u
      local.set $2
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/upperPathVariantData
      local.tee $4
      i32.store
      local.get $3
      local.get $4
      i32.add
      i32.const 255
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/upperPathHeightData
      local.tee $4
      i32.store
      local.get $3
      local.get $4
      i32.add
      i32.const 0
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/upperRampDirData
      local.tee $4
      i32.store
      local.get $3
      local.get $4
      i32.add
      i32.const 0
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/pathLevelData
      local.tee $3
      i32.store
      local.get $0
      local.get $1
      local.get $2
      call $assembly/sim/behavior/navigation/nodeIndex
      local.get $3
      i32.add
      i32.const 255
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/pathLevelRampData
      local.tee $3
      i32.store
      local.get $0
      local.get $1
      local.get $2
      call $assembly/sim/behavior/navigation/nodeIndex
      local.get $3
      i32.add
      i32.const 0
      i32.store8
      i32.const 5
      call $assembly/sim/economy/economy/earn
      local.get $0
      local.get $1
      call $assembly/sim/grid/gridOps/recomputeNeighborRamps
      local.get $0
      local.get $1
      call $assembly/sim/grid/gridOps/recomputeNeighborUpperRamps
      local.get $0
      local.get $1
      local.get $2
      call $assembly/sim/grid/gridOps/recomputeNeighborPathLevelRamps
      br $folding-inner1
     end
     local.get $0
     local.get $1
     i32.const 0
     call $assembly/sim/grid/gridOps/setTile
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/parkState/pukeData
     local.tee $2
     i32.store
     local.get $1
     i32.const 50
     i32.mul
     local.get $0
     i32.add
     local.tee $3
     local.get $2
     i32.add
     i32.const 0
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/rampDirData
     local.tee $2
     i32.store
     local.get $2
     local.get $3
     i32.add
     i32.const 0
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/upperRampDirData
     local.tee $2
     i32.store
     local.get $2
     local.get $3
     i32.add
     i32.const 0
     i32.store8
     i32.const 5
     call $assembly/sim/economy/economy/earn
    end
    local.get $0
    local.get $1
    call $assembly/sim/grid/gridOps/recomputeNeighborRamps
    local.get $0
    local.get $1
    call $assembly/sim/grid/gridOps/recomputeNeighborUpperRamps
    br $folding-inner1
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/employees/employees/getMechanicX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicTarget (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechTarget
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicRepairTimer (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechRepairTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicUid (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechUid
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicHiredTick (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechHiredTick
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicRepairsCompleted (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechRepairsCompleted
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicAreaCount (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechAreaCount
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicAreaX (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 8
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 4
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/mechAreaX
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getMechanicAreaY (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 8
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 4
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/mechAreaY
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerTargetX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerTargetX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerTargetY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerTargetY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerCleanTimer (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerCleanTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerUid (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerUid
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerHiredTick (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerHiredTick
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerPathsCleaned (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerPathsCleaned
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerAreaCount (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerAreaCount
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerAreaX (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 8
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 4
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerAreaX
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getCleanerAreaY (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 8
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 4
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerAreaY
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityTargetVisitor (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityTargetVisitor
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityUid (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityUid
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityHiredTick (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityHiredTick
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityIncidentsHandled (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityIncidentsHandled
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityAreaCount (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaCount
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityAreaX (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 8
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 4
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/securityAreaX
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getSecurityAreaY (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 8
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 4
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/securityAreaY
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getEntertainerX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getEntertainerY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getEntertainerUid (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerUid
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getEntertainerHiredTick (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerHiredTick
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getEntertainerGuestsCheered (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getEntertainerAreaCount (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaCount
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getEntertainerAreaX (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 8
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 4
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/entertainerAreaX
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/getEntertainerAreaY (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 8
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 4
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/entertainerAreaY
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/hireMechanic (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   global.get $assembly/sim/state/employeeState/mechanicCount
   i32.const 8
   i32.ge_s
   br_if $folding-inner0
   i32.const 350
   call $assembly/sim/economy/economy/spend
   i32.eqz
   br_if $folding-inner0
   global.get $assembly/sim/state/employeeState/mechanicCount
   local.set $1
   global.get $assembly/sim/state/employeeState/mechanicCount
   i32.const 1
   i32.add
   global.set $assembly/sim/state/employeeState/mechanicCount
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechActive
   local.tee $2
   i32.store
   local.get $1
   local.get $2
   i32.add
   i32.const 1
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 25
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 49
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechTarget
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechRepairTimer
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechUid
   local.tee $2
   i32.store
   global.get $assembly/sim/state/employeeState/nextEmployeeUid
   local.tee $3
   i32.const 1
   i32.add
   global.set $assembly/sim/state/employeeState/nextEmployeeUid
   local.get $2
   local.get $1
   local.get $3
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechHiredTick
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   global.get $assembly/sim/state/visitorState/tickCount
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechRepairsCompleted
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechPatrolX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechPatrolY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechAreaCount
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   loop $for-loop|0
    local.get $0
    i32.const 4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/mechAreaX
     local.tee $2
     i32.store
     local.get $2
     local.get $1
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.tee $2
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/mechAreaY
     local.tee $3
     i32.store
     local.get $3
     local.get $2
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/employees/employees/hireCleaner (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   global.get $assembly/sim/state/employeeState/cleanerCount
   i32.const 8
   i32.ge_s
   br_if $folding-inner0
   i32.const 300
   call $assembly/sim/economy/economy/spend
   i32.eqz
   br_if $folding-inner0
   global.get $assembly/sim/state/employeeState/cleanerCount
   local.set $1
   global.get $assembly/sim/state/employeeState/cleanerCount
   i32.const 1
   i32.add
   global.set $assembly/sim/state/employeeState/cleanerCount
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerActive
   local.tee $2
   i32.store
   local.get $1
   local.get $2
   i32.add
   i32.const 1
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 25
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 49
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerTargetX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerTargetY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerCleanTimer
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerUid
   local.tee $2
   i32.store
   global.get $assembly/sim/state/employeeState/nextEmployeeUid
   local.tee $3
   i32.const 1
   i32.add
   global.set $assembly/sim/state/employeeState/nextEmployeeUid
   local.get $2
   local.get $1
   local.get $3
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerHiredTick
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   global.get $assembly/sim/state/visitorState/tickCount
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerPathsCleaned
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerPatrolX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerPatrolY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerAreaCount
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   loop $for-loop|0
    local.get $0
    i32.const 4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/cleanerAreaX
     local.tee $2
     i32.store
     local.get $2
     local.get $1
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.tee $2
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/cleanerAreaY
     local.tee $3
     i32.store
     local.get $3
     local.get $2
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/employees/employees/hireSecurity (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   global.get $assembly/sim/state/employeeState/securityCount
   i32.const 8
   i32.ge_s
   br_if $folding-inner0
   i32.const 420
   call $assembly/sim/economy/economy/spend
   i32.eqz
   br_if $folding-inner0
   global.get $assembly/sim/state/employeeState/securityCount
   local.set $1
   global.get $assembly/sim/state/employeeState/securityCount
   i32.const 1
   i32.add
   global.set $assembly/sim/state/employeeState/securityCount
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityActive
   local.tee $2
   i32.store
   local.get $1
   local.get $2
   i32.add
   i32.const 1
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 25
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 49
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityTargetVisitor
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityPatrolX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityPatrolY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityUid
   local.tee $2
   i32.store
   global.get $assembly/sim/state/employeeState/nextEmployeeUid
   local.tee $3
   i32.const 1
   i32.add
   global.set $assembly/sim/state/employeeState/nextEmployeeUid
   local.get $2
   local.get $1
   local.get $3
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityHiredTick
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   global.get $assembly/sim/state/visitorState/tickCount
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityIncidentsHandled
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaCount
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   loop $for-loop|0
    local.get $0
    i32.const 4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/securityAreaX
     local.tee $2
     i32.store
     local.get $2
     local.get $1
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.tee $2
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/securityAreaY
     local.tee $3
     i32.store
     local.get $3
     local.get $2
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/employees/employees/hireEntertainer (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   global.get $assembly/sim/state/employeeState/entertainerCount
   i32.const 8
   i32.ge_s
   br_if $folding-inner0
   i32.const 380
   call $assembly/sim/economy/economy/spend
   i32.eqz
   br_if $folding-inner0
   global.get $assembly/sim/state/employeeState/entertainerCount
   local.set $1
   global.get $assembly/sim/state/employeeState/entertainerCount
   i32.const 1
   i32.add
   global.set $assembly/sim/state/employeeState/entertainerCount
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerActive
   local.tee $2
   i32.store
   local.get $1
   local.get $2
   i32.add
   i32.const 1
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 25
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 49
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerPatrolX
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerPatrolY
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerUid
   local.tee $2
   i32.store
   global.get $assembly/sim/state/employeeState/nextEmployeeUid
   local.tee $3
   i32.const 1
   i32.add
   global.set $assembly/sim/state/employeeState/nextEmployeeUid
   local.get $2
   local.get $1
   local.get $3
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerHiredTick
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   global.get $assembly/sim/state/visitorState/tickCount
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaCount
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   loop $for-loop|0
    local.get $0
    i32.const 4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/entertainerAreaX
     local.tee $2
     i32.store
     local.get $2
     local.get $1
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.tee $2
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/employeeState/entertainerAreaY
     local.tee $3
     i32.store
     local.get $3
     local.get $2
     i32.const -1
     call $~lib/staticarray/StaticArray<i32>#__uset
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/employees/employees/fireMechanic (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/mechanicCount
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  loop $for-loop|0
   local.get $0
   global.get $assembly/sim/state/employeeState/mechanicCount
   i32.const 1
   i32.sub
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechActive
    local.tee $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechActive
    local.tee $2
    i32.store offset=4
    local.get $0
    local.get $1
    i32.add
    local.get $0
    i32.const 1
    i32.add
    local.tee $1
    local.get $2
    i32.add
    i32.load8_u
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $3
    local.get $1
    i32.const 2
    i32.shl
    local.tee $1
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechTarget
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechTarget
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechRepairTimer
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechRepairTimer
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechUid
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechUid
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechHiredTick
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechHiredTick
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechRepairsCompleted
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechRepairsCompleted
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechPatrolX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechPatrolX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechPatrolY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechPatrolY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechAreaCount
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechAreaCount
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechAreaX
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechAreaX
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $0
      i32.const 2
      i32.shl
      local.get $1
      i32.add
      local.tee $4
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      i32.const 2
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      local.tee $5
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechAreaY
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/mechAreaY
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $4
      local.get $3
      local.get $5
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/mechActive
  local.tee $0
  i32.store
  global.get $assembly/sim/state/employeeState/mechanicCount
  i32.const 1
  i32.sub
  local.tee $2
  local.get $0
  i32.add
  i32.const 0
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/mechTarget
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/mechRepairTimer
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/mechPatrolX
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/mechPatrolY
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/mechAreaCount
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  i32.const 0
  local.set $1
  loop $for-loop|2
   local.get $1
   i32.const 4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechAreaX
    local.tee $0
    i32.store
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    local.get $1
    i32.add
    local.tee $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/mechAreaY
    local.tee $3
    i32.store
    local.get $3
    local.get $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
  global.get $assembly/sim/state/employeeState/mechanicCount
  i32.const 1
  i32.sub
  global.set $assembly/sim/state/employeeState/mechanicCount
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/employees/employees/fireCleaner (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/cleanerCount
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  loop $for-loop|0
   local.get $0
   global.get $assembly/sim/state/employeeState/cleanerCount
   i32.const 1
   i32.sub
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerActive
    local.tee $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerActive
    local.tee $2
    i32.store offset=4
    local.get $0
    local.get $1
    i32.add
    local.get $0
    i32.const 1
    i32.add
    local.tee $1
    local.get $2
    i32.add
    i32.load8_u
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $3
    local.get $1
    i32.const 2
    i32.shl
    local.tee $1
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerTargetX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerTargetX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerTargetY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerTargetY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerCleanTimer
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerCleanTimer
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerUid
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerUid
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerHiredTick
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerHiredTick
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPathsCleaned
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPathsCleaned
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPatrolX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPatrolX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPatrolY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerPatrolY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerAreaCount
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerAreaCount
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerAreaX
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerAreaX
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $0
      i32.const 2
      i32.shl
      local.get $1
      i32.add
      local.tee $4
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      i32.const 2
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      local.tee $5
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerAreaY
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/cleanerAreaY
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $4
      local.get $3
      local.get $5
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerActive
  local.tee $0
  i32.store
  global.get $assembly/sim/state/employeeState/cleanerCount
  i32.const 1
  i32.sub
  local.tee $2
  local.get $0
  i32.add
  i32.const 0
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerTargetX
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerTargetY
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerCleanTimer
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerPatrolX
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerPatrolY
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/cleanerAreaCount
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  i32.const 0
  local.set $1
  loop $for-loop|2
   local.get $1
   i32.const 4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerAreaX
    local.tee $0
    i32.store
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    local.get $1
    i32.add
    local.tee $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/cleanerAreaY
    local.tee $3
    i32.store
    local.get $3
    local.get $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
  global.get $assembly/sim/state/employeeState/cleanerCount
  i32.const 1
  i32.sub
  global.set $assembly/sim/state/employeeState/cleanerCount
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/employees/employees/fireSecurity (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/securityCount
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  loop $for-loop|0
   local.get $0
   global.get $assembly/sim/state/employeeState/securityCount
   i32.const 1
   i32.sub
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityActive
    local.tee $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityActive
    local.tee $2
    i32.store offset=4
    local.get $0
    local.get $1
    i32.add
    local.get $0
    i32.const 1
    i32.add
    local.tee $1
    local.get $2
    i32.add
    i32.load8_u
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $3
    local.get $1
    i32.const 2
    i32.shl
    local.tee $1
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityTargetVisitor
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityTargetVisitor
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityPatrolX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityPatrolX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityPatrolY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityPatrolY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityUid
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityUid
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityHiredTick
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityHiredTick
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityIncidentsHandled
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityIncidentsHandled
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityAreaCount
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityAreaCount
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityAreaX
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityAreaX
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $0
      i32.const 2
      i32.shl
      local.get $1
      i32.add
      local.tee $4
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      i32.const 2
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      local.tee $5
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityAreaY
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/securityAreaY
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $4
      local.get $3
      local.get $5
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/securityActive
  local.tee $0
  i32.store
  global.get $assembly/sim/state/employeeState/securityCount
  i32.const 1
  i32.sub
  local.tee $2
  local.get $0
  i32.add
  i32.const 0
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/securityTargetVisitor
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/securityPatrolX
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/securityPatrolY
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/securityAreaCount
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  i32.const 0
  local.set $1
  loop $for-loop|2
   local.get $1
   i32.const 4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityAreaX
    local.tee $0
    i32.store
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    local.get $1
    i32.add
    local.tee $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/securityAreaY
    local.tee $3
    i32.store
    local.get $3
    local.get $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
  global.get $assembly/sim/state/employeeState/securityCount
  i32.const 1
  i32.sub
  global.set $assembly/sim/state/employeeState/securityCount
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/employees/employees/fireEntertainer (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/entertainerCount
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  loop $for-loop|0
   local.get $0
   global.get $assembly/sim/state/employeeState/entertainerCount
   i32.const 1
   i32.sub
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerActive
    local.tee $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerActive
    local.tee $2
    i32.store offset=4
    local.get $0
    local.get $1
    i32.add
    local.get $0
    i32.const 1
    i32.add
    local.tee $1
    local.get $2
    i32.add
    i32.load8_u
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $3
    local.get $1
    i32.const 2
    i32.shl
    local.tee $1
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerPatrolX
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerPatrolX
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerPatrolY
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerPatrolY
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerUid
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerUid
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerHiredTick
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerHiredTick
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerAreaCount
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerAreaCount
    local.tee $3
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $1
    local.get $3
    i32.add
    i32.load
    call $~lib/staticarray/StaticArray<i32>#__uset
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/entertainerAreaX
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/entertainerAreaX
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $0
      i32.const 2
      i32.shl
      local.get $1
      i32.add
      local.tee $4
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      i32.const 2
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      local.tee $5
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/entertainerAreaY
      local.tee $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/employeeState/entertainerAreaY
      local.tee $3
      i32.store offset=4
      local.get $2
      local.get $4
      local.get $3
      local.get $5
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/entertainerActive
  local.tee $0
  i32.store
  global.get $assembly/sim/state/employeeState/entertainerCount
  i32.const 1
  i32.sub
  local.tee $2
  local.get $0
  i32.add
  i32.const 0
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/entertainerPatrolX
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/entertainerPatrolY
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const -1
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/entertainerGuestsCheered
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/employeeState/entertainerAreaCount
  local.tee $0
  i32.store
  local.get $0
  local.get $2
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  i32.const 0
  local.set $1
  loop $for-loop|2
   local.get $1
   i32.const 4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerAreaX
    local.tee $0
    i32.store
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    local.get $1
    i32.add
    local.tee $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/employeeState/entertainerAreaY
    local.tee $3
    i32.store
    local.get $3
    local.get $0
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
  global.get $assembly/sim/state/employeeState/entertainerCount
  i32.const 1
  i32.sub
  global.set $assembly/sim/state/employeeState/entertainerCount
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/employees/employees/addEmployeeArea (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (result i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $4
  i32.const 0
  i32.lt_s
  local.get $4
  i32.const 50
  i32.ge_s
  i32.or
  local.get $5
  i32.const 0
  i32.lt_s
  i32.or
  local.get $5
  i32.const 50
  i32.ge_s
  i32.or
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $6
   i32.store
   i32.const 1
   local.get $5
   i32.const 50
   i32.mul
   local.get $4
   i32.add
   local.get $6
   i32.add
   i32.load8_u
   local.tee $6
   i32.const 2
   i32.eq
   local.get $6
   call $assembly/sim/behavior/navigation/isWalkable
   select
   local.set $6
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   local.get $6
   i32.eqz
   local.get $3
   i32.const 0
   i32.lt_s
   i32.or
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $3
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $6
    loop $for-loop|0
     local.get $6
     local.get $7
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store
      local.get $4
      local.get $1
      local.get $3
      i32.const 2
      i32.shl
      local.get $7
      i32.add
      i32.const 2
      i32.shl
      local.tee $8
      i32.add
      i32.load
      i32.eq
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store
       local.get $5
       local.get $2
       local.get $8
       i32.add
       i32.load
       i32.eq
      else
       i32.const 0
      end
      br_if $folding-inner1
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|0
     end
    end
    local.get $6
    i32.const 4
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     local.get $3
     i32.const 2
     i32.shl
     local.get $6
     i32.add
     local.tee $1
     local.get $4
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     local.get $2
     local.get $1
     local.get $5
     call $~lib/staticarray/StaticArray<i32>#__uset
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $3
     local.get $6
     i32.const 1
     i32.add
     call $~lib/staticarray/StaticArray<i32>#__uset
     br $folding-inner1
    end
    i32.const 1
    local.set $0
    loop $for-loop|1
     local.get $0
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=4
      local.get $1
      local.get $3
      i32.const 2
      i32.shl
      local.tee $6
      local.get $0
      i32.const 1
      i32.sub
      i32.add
      local.tee $7
      local.get $1
      local.get $0
      local.get $6
      i32.add
      i32.const 2
      i32.shl
      local.tee $6
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store offset=4
      local.get $2
      local.get $7
      local.get $2
      local.get $6
      i32.add
      i32.load
      call $~lib/staticarray/StaticArray<i32>#__uset
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $1
    local.get $3
    i32.const 2
    i32.shl
    i32.const 3
    i32.add
    local.tee $0
    local.get $4
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $2
    local.get $0
    local.get $5
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 1
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/employees/employees/setMechanicArea (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/mechanicCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechActive
   local.tee $3
   i32.store
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if (result i32)
   i32.const 0
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechAreaCount
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechAreaX
   local.tee $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechAreaY
   local.tee $3
   i32.store offset=8
   local.get $4
   local.get $5
   local.get $3
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/employees/employees/addEmployeeArea
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/clearEmployeeAreas (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $3
  i32.const 0
  call $~lib/staticarray/StaticArray<i32>#__uset
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $0
   i32.const 4
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $1
    local.get $3
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    local.tee $4
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    local.get $2
    local.get $4
    i32.const -1
    call $~lib/staticarray/StaticArray<i32>#__uset
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/employees/employees/clearMechanicAreas (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/mechanicCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechActive
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if (result i32)
   i32.const 0
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechPatrolX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechPatrolY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechAreaCount
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechAreaX
   local.tee $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechAreaY
   local.tee $1
   i32.store offset=8
   local.get $2
   local.get $3
   local.get $1
   local.get $0
   call $assembly/sim/employees/employees/clearEmployeeAreas
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/setCleanerArea (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/cleanerCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerActive
   local.tee $3
   i32.store
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if (result i32)
   i32.const 0
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerAreaCount
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerAreaX
   local.tee $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerAreaY
   local.tee $3
   i32.store offset=8
   local.get $4
   local.get $5
   local.get $3
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/employees/employees/addEmployeeArea
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/clearCleanerAreas (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/cleanerCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerActive
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if (result i32)
   i32.const 0
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerPatrolX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerPatrolY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerAreaCount
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerAreaX
   local.tee $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerAreaY
   local.tee $1
   i32.store offset=8
   local.get $2
   local.get $3
   local.get $1
   local.get $0
   call $assembly/sim/employees/employees/clearEmployeeAreas
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/setSecurityArea (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/securityCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityActive
   local.tee $3
   i32.store
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if (result i32)
   i32.const 0
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaCount
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaX
   local.tee $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaY
   local.tee $3
   i32.store offset=8
   local.get $4
   local.get $5
   local.get $3
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/employees/employees/addEmployeeArea
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/clearSecurityAreas (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/securityCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityActive
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if (result i32)
   i32.const 0
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityPatrolX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityPatrolY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaCount
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaX
   local.tee $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityAreaY
   local.tee $1
   i32.store offset=8
   local.get $2
   local.get $3
   local.get $1
   local.get $0
   call $assembly/sim/employees/employees/clearEmployeeAreas
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/setEntertainerArea (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/entertainerCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerActive
   local.tee $3
   i32.store
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if (result i32)
   i32.const 0
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaCount
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaX
   local.tee $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaY
   local.tee $3
   i32.store offset=8
   local.get $4
   local.get $5
   local.get $3
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/employees/employees/addEmployeeArea
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/clearEntertainerAreas (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/entertainerCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerActive
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  if (result i32)
   i32.const 0
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerPatrolX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerPatrolY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaCount
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaX
   local.tee $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerAreaY
   local.tee $1
   i32.store offset=8
   local.get $2
   local.get $3
   local.get $1
   local.get $0
   call $assembly/sim/employees/employees/clearEmployeeAreas
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/employees/employees/relocateMechanic (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/mechanicCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechActive
   local.tee $3
   i32.store
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  local.get $1
  local.get $2
  i32.or
  i32.const 0
  i32.lt_s
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  local.get $2
  i32.const 50
  i32.ge_s
  i32.or
  i32.or
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechX
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   local.get $2
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechTarget
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/mechRepairTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/employees/employees/relocateCleaner (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/cleanerCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerActive
   local.tee $3
   i32.store
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  local.get $1
  local.get $2
  i32.or
  i32.const 0
  i32.lt_s
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  local.get $2
  i32.const 50
  i32.ge_s
  i32.or
  i32.or
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerX
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   local.get $2
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerTargetX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerTargetY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/cleanerCleanTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/employees/employees/relocateSecurity (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/securityCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityActive
   local.tee $3
   i32.store
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  local.get $1
  local.get $2
  i32.or
  i32.const 0
  i32.lt_s
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  local.get $2
  i32.const 50
  i32.ge_s
  i32.or
  i32.or
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityX
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   local.get $2
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/securityTargetVisitor
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/employees/employees/relocateEntertainer (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  global.get $assembly/sim/state/employeeState/entertainerCount
  i32.ge_s
  i32.or
  if (result i32)
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerActive
   local.tee $3
   i32.store
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 1
   i32.ne
  end
  local.get $1
  local.get $2
  i32.or
  i32.const 0
  i32.lt_s
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  local.get $2
  i32.const 50
  i32.ge_s
  i32.or
  i32.or
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerX
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   local.get $2
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerPatrolX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/employeeState/entertainerPatrolY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/employees/employees/applyDrowningPenalty
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $assembly/sim/state/parkState/parkAttractiveness
  i32.const 10
  i32.sub
  local.tee $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.ge_s
  select
  global.set $assembly/sim/state/parkState/parkAttractiveness
  loop $for-loop|0
   local.get $0
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $1
    i32.store
    local.get $0
    local.get $1
    i32.add
    i32.load8_u
    i32.const 255
    i32.ne
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vSatisfaction
     local.tee $1
     i32.store offset=4
     local.get $2
     local.get $0
     local.get $1
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.const 12
     i32.sub
     local.tee $1
     i32.const 0
     local.get $1
     i32.const 0
     i32.ge_s
     select
     call $~lib/staticarray/StaticArray<i32>#__uset
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/visitors/visitors/getVisitorX (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorY (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorState (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vState
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
  else
   i32.const 255
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorSatisfaction (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vSatisfaction
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorTarget (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vTarget
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorStuckTimer (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vStuckTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorWallet (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vWallet
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorPathLevel (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vLevel
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorHunger (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vNeeds
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 6
   i32.mul
   i32.const 3
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorThirst (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vNeeds
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 6
   i32.mul
   i32.const 4
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorBladder (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vNeeds
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 6
   i32.mul
   i32.const 5
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorFun (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vNeeds
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 24
   i32.mul
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorNausea (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vNausea
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorPukeTimer (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vPukeTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorExcitement (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vExcitement
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorExcitementTolerance (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vExcitementTolerance
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorIsCriminal (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vCriminal
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorBalloonTimer (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vBalloonTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getVisitorUmbrellaTimer (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 100
  i32.lt_s
  local.get $0
  i32.const 0
  i32.ge_s
  i32.and
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vUmbrellaTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   i32.load
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getPukeAt (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 0
  i32.lt_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/parkState/pukeData
  local.tee $2
  i32.store
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $2
  i32.add
  i32.load8_u
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getDirtyPathCount (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 2500
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/parkState/pukeData
    local.tee $2
    i32.store
    local.get $1
    i32.const 1
    i32.add
    local.get $1
    local.get $0
    local.get $2
    i32.add
    i32.load8_u
    select
    local.set $1
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/sim/visitors/visitors/getAvgHunger (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $assembly/sim/state/visitorState/activeVisitors
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  loop $for-loop|0
   local.get $1
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $3
    i32.store
    local.get $1
    local.get $3
    i32.add
    i32.load8_u
    i32.const 255
    i32.ne
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $3
     i32.store
     local.get $2
     local.get $3
     local.get $1
     i32.const 6
     i32.mul
     i32.const 3
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.add
     local.set $2
     local.get $0
     i32.const 1
     i32.add
     local.set $0
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  local.get $0
  i32.const 0
  i32.gt_s
  if (result i32)
   local.get $2
   local.get $0
   i32.div_s
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getAvgThirst (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $assembly/sim/state/visitorState/activeVisitors
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  loop $for-loop|0
   local.get $1
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $3
    i32.store
    local.get $1
    local.get $3
    i32.add
    i32.load8_u
    i32.const 255
    i32.ne
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $3
     i32.store
     local.get $2
     local.get $3
     local.get $1
     i32.const 6
     i32.mul
     i32.const 4
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.add
     local.set $2
     local.get $0
     i32.const 1
     i32.add
     local.set $0
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  local.get $0
  i32.const 0
  i32.gt_s
  if (result i32)
   local.get $2
   local.get $0
   i32.div_s
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/getAvgBladder (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $assembly/sim/state/visitorState/activeVisitors
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  loop $for-loop|0
   local.get $1
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/visitorState/vState
    local.tee $3
    i32.store
    local.get $1
    local.get $3
    i32.add
    i32.load8_u
    i32.const 255
    i32.ne
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/visitorState/vNeeds
     local.tee $3
     i32.store
     local.get $2
     local.get $3
     local.get $1
     i32.const 6
     i32.mul
     i32.const 5
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.add
     local.set $2
     local.get $0
     i32.const 1
     i32.add
     local.set $0
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  local.get $0
  i32.const 0
  i32.gt_s
  if (result i32)
   local.get $2
   local.get $0
   i32.div_s
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/visitors/visitors/triggerCriminalEscape (param $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 100
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vState
  local.tee $1
  i32.store
  local.get $0
  local.get $1
  i32.add
  i32.load8_u
  i32.const 255
  i32.eq
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vState
  local.tee $1
  i32.store
  local.get $0
  local.get $1
  i32.add
  i32.const 4
  i32.store8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/visitorState/vTimer
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.const 45
  call $~lib/staticarray/StaticArray<i32>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/sim/visitors/visitors/relocateVisitor (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $folding-inner0
   local.get $0
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 100
   i32.ge_s
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vState
   local.tee $3
   i32.store
   local.get $1
   local.get $2
   i32.or
   i32.const 0
   i32.lt_s
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   local.get $2
   i32.const 50
   i32.ge_s
   i32.or
   local.get $0
   local.get $3
   i32.add
   i32.load8_u
   i32.const 255
   i32.eq
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vX
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vY
   local.tee $3
   i32.store
   local.get $3
   local.get $0
   local.get $2
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vLevel
   local.tee $3
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $4
   i32.store offset=4
   local.get $0
   local.get $3
   i32.add
   local.get $2
   i32.const 50
   i32.mul
   local.get $1
   i32.add
   local.get $4
   i32.add
   i32.load8_u
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vState
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.const 1
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vTarget
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vQueueX
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vQueueY
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const -1
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vQueueOrder
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vTimer
   local.tee $1
   i32.store
   local.get $1
   local.get $0
   i32.const 0
   call $~lib/staticarray/StaticArray<i32>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/visitors/visitors/drownVisitor (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 100
   i32.ge_s
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/visitorState/vState
   local.tee $1
   i32.store
   local.get $0
   local.get $1
   i32.add
   i32.load8_u
   i32.const 255
   i32.eq
   br_if $folding-inner0
   local.get $0
   call $assembly/sim/visitors/visitors/resetVisitor
   global.get $assembly/sim/state/visitorState/activeVisitors
   i32.const 1
   i32.sub
   local.tee $0
   i32.const 0
   local.get $0
   i32.const 0
   i32.ge_s
   select
   global.set $assembly/sim/state/visitorState/activeVisitors
   call $assembly/sim/employees/employees/applyDrowningPenalty
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/placement/placement/adjustTerrain (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   i32.or
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $4
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.tee $3
   local.get $4
   i32.add
   i32.load8_u
   local.tee $4
   i32.const 9
   i32.eq
   local.get $4
   i32.const 32
   i32.ge_u
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $4
   i32.store
   local.get $2
   local.get $3
   local.get $4
   i32.add
   i32.load8_u
   i32.add
   local.tee $4
   i32.const 0
   i32.lt_s
   local.get $4
   global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
   i32.gt_s
   i32.or
   br_if $folding-inner0
   local.get $2
   i32.const 0
   i32.gt_s
   if (result i32)
    i32.const 4
    call $assembly/sim/economy/economy/spend
   else
    i32.const 1
   end
   i32.eqz
   br_if $folding-inner0
   local.get $2
   i32.const 0
   i32.lt_s
   if
    i32.const 4
    call $assembly/sim/economy/economy/earn
   end
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $2
   i32.store
   local.get $2
   local.get $3
   i32.add
   local.get $4
   i32.store8
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/cornerMaskData
   local.tee $2
   i32.store
   local.get $2
   local.get $3
   i32.add
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   call $assembly/sim/grid/gridOps/recomputeRamp
   local.get $0
   local.get $1
   call $assembly/sim/grid/gridOps/recomputeNeighborRamps
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/placement/placement/adjustTerrainCorners (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   block $folding-inner0
    local.get $0
    local.get $1
    i32.or
    i32.const 0
    i32.lt_s
    local.get $0
    i32.const 50
    i32.ge_s
    i32.or
    local.get $1
    i32.const 50
    i32.ge_s
    i32.or
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $5
    i32.store
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.tee $4
    local.get $5
    i32.add
    i32.load8_u
    local.tee $5
    i32.const 9
    i32.eq
    local.get $5
    i32.const 32
    i32.ge_u
    i32.or
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $5
    i32.store
    local.get $4
    local.get $5
    i32.add
    i32.load8_u
    local.set $5
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/cornerMaskData
    local.tee $6
    i32.store
    local.get $4
    local.get $6
    i32.add
    i32.load8_u
    local.set $6
    local.get $2
    i32.const 8
    i32.and
    i32.eqz
    i32.eqz
    local.get $2
    i32.const 4
    i32.and
    i32.eqz
    i32.eqz
    local.get $2
    i32.const 2
    i32.and
    i32.eqz
    i32.eqz
    local.get $2
    i32.const 1
    i32.and
    i32.add
    i32.add
    i32.add
    i32.eqz
    br_if $folding-inner0
    local.get $3
    i32.const 0
    i32.gt_s
    if
     i32.const 4
     call $assembly/sim/economy/economy/spend
     i32.eqz
     br_if $folding-inner0
    else
     i32.const 4
     call $assembly/sim/economy/economy/earn
    end
    local.get $3
    i32.const 0
    i32.gt_s
    if
     local.get $2
     i32.const 15
     i32.eq
     if
      local.get $5
      global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
      i32.ge_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/heightData
      local.tee $2
      i32.store
      local.get $2
      local.get $4
      i32.add
      local.get $5
      i32.const 1
      i32.add
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/cornerMaskData
      local.tee $2
      i32.store
      local.get $2
      local.get $4
      i32.add
      i32.const 0
      i32.store8
      br $folding-inner1
     end
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/cornerMaskData
     local.tee $3
     i32.store
     local.get $3
     local.get $4
     i32.add
     local.get $2
     local.get $6
     i32.or
     i32.store8
     br $folding-inner1
    end
    local.get $2
    i32.const 15
    i32.eq
    if
     local.get $6
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/cornerMaskData
      local.tee $2
      i32.store
      local.get $2
      local.get $4
      i32.add
      i32.const 0
      i32.store8
     else
      local.get $5
      i32.const 0
      i32.le_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/heightData
      local.tee $2
      i32.store
      local.get $2
      local.get $4
      i32.add
      local.get $5
      i32.const 1
      i32.sub
      i32.store8
     end
     br $folding-inner1
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/cornerMaskData
    local.tee $3
    i32.store
    local.get $3
    local.get $4
    i32.add
    local.get $6
    local.get $2
    i32.const -1
    i32.xor
    i32.and
    i32.store8
    local.get $0
    local.get $1
    call $assembly/sim/grid/gridOps/recomputeRamp
    local.get $0
    local.get $1
    call $assembly/sim/grid/gridOps/recomputeNeighborRamps
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 1
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  local.get $0
  local.get $1
  call $assembly/sim/grid/gridOps/recomputeRamp
  local.get $0
  local.get $1
  call $assembly/sim/grid/gridOps/recomputeNeighborRamps
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/placement/placement/placePathVariant (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   block $folding-inner0
    local.get $0
    local.get $1
    i32.or
    i32.const 0
    i32.lt_s
    local.get $0
    i32.const 50
    i32.ge_s
    i32.or
    local.get $1
    i32.const 50
    i32.ge_s
    i32.or
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $3
    i32.store
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.tee $4
    local.get $3
    i32.add
    i32.load8_u
    local.tee $5
    call $assembly/sim/grid/gridOps/isLandTile
    if (result i32)
     i32.const 1
    else
     local.get $5
     call $assembly/sim/grid/gridOps/isPathTile
    end
    i32.eqz
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $3
    i32.store
    global.get $assembly/sim/state/gridState/TERRAIN_MAX_BUILD_HEIGHT
    local.get $3
    local.get $4
    i32.add
    i32.load8_u
    i32.lt_s
    br_if $folding-inner0
    i32.const 8
    local.set $3
    local.get $2
    i32.const 1
    i32.eq
    if (result i32)
     i32.const 10
     local.set $3
     i32.const 2
    else
     local.get $2
     i32.const 2
     i32.eq
     if (result i32)
      i32.const 14
      local.set $3
      i32.const 3
     else
      local.get $2
      i32.const 3
      i32.eq
      if (result i32)
       i32.const 12
       local.set $3
       i32.const 4
      else
       i32.const 1
      end
     end
    end
    local.set $2
    local.get $5
    call $assembly/sim/grid/gridOps/isPathTile
    br_if $folding-inner1
    local.get $3
    call $assembly/sim/economy/economy/spend
    i32.eqz
    br_if $folding-inner0
    br $folding-inner1
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  local.get $0
  local.get $1
  local.get $2
  call $assembly/sim/grid/gridOps/setTile
  local.get $0
  local.get $1
  call $assembly/sim/grid/gridOps/recomputeRamp
  local.get $0
  local.get $1
  call $assembly/sim/grid/gridOps/recomputeNeighborRamps
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/placement/placement/placeElevatedPath (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   local.get $0
   local.get $1
   i32.or
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $4
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.tee $3
   local.get $4
   i32.add
   i32.load8_u
   call $assembly/sim/grid/gridOps/isPathTile
   i32.eqz
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $4
   i32.store
   global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
   local.get $3
   local.get $4
   i32.add
   i32.load8_u
   i32.le_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/upperPathVariantData
   local.tee $4
   i32.store
   local.get $3
   local.get $4
   i32.add
   i32.load8_s
   local.set $5
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $6
   i32.store
   global.get $assembly/sim/state/gridState/TERRAIN_MAX_HEIGHT
   local.tee $4
   local.get $3
   local.get $6
   i32.add
   i32.load8_u
   i32.const 1
   i32.add
   local.tee $6
   local.get $4
   local.get $6
   i32.lt_s
   select
   local.set $4
   local.get $5
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathVariantData
    local.tee $5
    i32.store
    local.get $3
    local.get $5
    i32.add
    local.get $2
    i32.store8
   else
    local.get $2
    i32.const 1
    i32.eq
    if (result i32)
     i32.const 10
    else
     i32.const 14
     i32.const 12
     i32.const 8
     local.get $2
     i32.const 3
     i32.eq
     select
     local.get $2
     i32.const 2
     i32.eq
     select
    end
    call $assembly/sim/economy/economy/spend
    i32.eqz
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathVariantData
    local.tee $5
    i32.store
    local.get $3
    local.get $5
    i32.add
    local.get $2
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/upperPathHeightData
    local.tee $5
    i32.store
    local.get $3
    local.get $5
    i32.add
    local.get $4
    i32.store8
   end
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/pathLevelData
   local.tee $3
   i32.store
   local.get $0
   local.get $1
   local.get $4
   call $assembly/sim/behavior/navigation/nodeIndex
   local.get $3
   i32.add
   local.get $2
   i32.store8
   local.get $0
   local.get $1
   call $assembly/sim/grid/gridOps/recomputeUpperRamp
   local.get $0
   local.get $1
   call $assembly/sim/grid/gridOps/recomputeNeighborUpperRamps
   local.get $0
   local.get $1
   local.get $4
   call $assembly/sim/grid/gridOps/recomputePathLevelRamp
   local.get $0
   local.get $1
   local.get $4
   call $assembly/sim/grid/gridOps/recomputeNeighborPathLevelRamps
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/placement/placement/placeLandVariant (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   block $folding-inner0
    local.get $0
    local.get $1
    i32.or
    i32.const 0
    i32.lt_s
    local.get $0
    i32.const 50
    i32.ge_s
    i32.or
    local.get $1
    i32.const 50
    i32.ge_s
    i32.or
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $4
    i32.store
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.tee $3
    local.get $4
    i32.add
    i32.load8_u
    local.tee $4
    call $assembly/sim/grid/gridOps/isLandTile
    i32.eqz
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $5
    i32.store
    global.get $assembly/sim/state/gridState/TERRAIN_MAX_BUILD_HEIGHT
    local.get $3
    local.get $5
    i32.add
    i32.load8_u
    i32.lt_s
    br_if $folding-inner0
    local.get $2
    i32.const 1
    i32.eq
    if (result i32)
     i32.const 11
    else
     i32.const 12
     i32.const 13
     i32.const 10
     local.get $2
     i32.const 3
     i32.eq
     select
     local.get $2
     i32.const 2
     i32.eq
     select
    end
    local.tee $2
    local.get $4
    i32.eq
    br_if $folding-inner1
    local.get $4
    i32.eqz
    if
     i32.const 2
     call $assembly/sim/economy/economy/spend
     i32.eqz
     br_if $folding-inner0
    end
    local.get $0
    local.get $1
    local.get $2
    call $assembly/sim/grid/gridOps/setTile
    br $folding-inner1
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/placement/placement/placeTreeVariant (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   i32.or
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $3
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.tee $4
   local.get $3
   i32.add
   i32.load8_u
   call $assembly/sim/grid/gridOps/isLandTile
   i32.eqz
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $3
   i32.store
   global.get $assembly/sim/state/gridState/TERRAIN_MAX_BUILD_HEIGHT
   local.get $3
   local.get $4
   i32.add
   i32.load8_u
   i32.lt_s
   br_if $folding-inner0
   i32.const 20
   local.set $3
   local.get $2
   i32.const 1
   i32.eq
   if (result i32)
    i32.const 18
    local.set $3
    i32.const 14
   else
    local.get $2
    i32.const 2
    i32.eq
    if (result i32)
     i32.const 26
     local.set $3
     i32.const 15
    else
     local.get $2
     i32.const 3
     i32.eq
     if (result i32)
      i32.const 12
      local.set $3
      i32.const 16
     else
      local.get $2
      i32.const 4
      i32.eq
      if (result i32)
       i32.const 24
       local.set $3
       i32.const 17
      else
       local.get $2
       i32.const 5
       i32.eq
       if (result i32)
        i32.const 22
        local.set $3
        i32.const 18
       else
        local.get $2
        i32.const 6
        i32.eq
        if (result i32)
         i32.const 30
         local.set $3
         i32.const 6
        else
         local.get $2
         i32.const 7
         i32.eq
         if (result i32)
          i32.const 12
          local.set $3
          i32.const 7
         else
          i32.const 5
         end
        end
       end
      end
     end
    end
   end
   local.set $2
   local.get $3
   call $assembly/sim/economy/economy/spend
   i32.eqz
   br_if $folding-inner0
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/grid/gridOps/setTile
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/placement/placement/placeWater (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   i32.or
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/gridData
   local.tee $2
   i32.store
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.get $2
   i32.add
   i32.load8_u
   call $assembly/sim/grid/gridOps/isLandTile
   i32.eqz
   br_if $folding-inner0
   i32.const 25
   call $assembly/sim/economy/economy/spend
   i32.eqz
   br_if $folding-inner0
   local.get $0
   local.get $1
   i32.const 8
   call $assembly/sim/grid/gridOps/setTile
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $assembly/sim/placement/placement/placePathAtHeight (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   block $folding-inner0
    local.get $0
    local.get $1
    i32.or
    i32.const 0
    i32.lt_s
    local.get $0
    i32.const 50
    i32.ge_s
    i32.or
    local.get $1
    i32.const 50
    i32.ge_s
    i32.or
    local.get $2
    i32.const 0
    i32.lt_s
    local.get $2
    i32.const 9
    i32.ge_s
    i32.or
    i32.or
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $4
    i32.store
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.get $4
    i32.add
    i32.load8_u
    local.tee $5
    local.get $2
    i32.eq
    if
     local.get $0
     local.get $1
     local.get $3
     call $assembly/sim/placement/placement/placePathVariant
     local.set $0
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $0
     return
    end
    local.get $0
    local.get $1
    local.get $2
    call $assembly/sim/behavior/navigation/nodeIndex
    local.set $4
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $6
    i32.store
    local.get $4
    local.get $6
    i32.add
    i32.load8_s
    i32.const 0
    i32.ge_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/pathLevelData
     local.tee $0
     i32.store
     local.get $0
     local.get $4
     i32.add
     local.get $3
     i32.store8
     br $folding-inner1
    end
    local.get $3
    i32.const 1
    i32.eq
    if (result i32)
     i32.const 10
    else
     i32.const 14
     i32.const 12
     i32.const 8
     local.get $3
     i32.const 3
     i32.eq
     select
     local.get $3
     i32.const 2
     i32.eq
     select
    end
    local.get $2
    local.get $5
    i32.sub
    local.tee $5
    i32.const 31
    i32.shr_s
    local.tee $6
    local.get $5
    local.get $6
    i32.add
    i32.xor
    i32.const 2
    i32.shl
    i32.add
    call $assembly/sim/economy/economy/spend
    i32.eqz
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $5
    i32.store
    local.get $4
    local.get $5
    i32.add
    local.get $3
    i32.store8
    local.get $0
    local.get $1
    local.get $2
    call $assembly/sim/grid/gridOps/recomputePathLevelRamp
    local.get $0
    local.get $1
    local.get $2
    call $assembly/sim/grid/gridOps/recomputeNeighborPathLevelRamps
    br $folding-inner1
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/placement/placement/removePathAtHeight (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   block $folding-inner0
    local.get $0
    local.get $1
    i32.or
    i32.const 0
    i32.lt_s
    local.get $0
    i32.const 50
    i32.ge_s
    i32.or
    local.get $1
    i32.const 50
    i32.ge_s
    i32.or
    local.get $2
    i32.const 0
    i32.lt_s
    local.get $2
    i32.const 9
    i32.ge_s
    i32.or
    i32.or
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $3
    i32.store
    local.get $2
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.tee $4
    local.get $3
    i32.add
    i32.load8_u
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/gridData
     local.tee $2
     i32.store
     local.get $2
     local.get $4
     i32.add
     i32.load8_u
     local.tee $2
     i32.eqz
     local.get $2
     i32.const 9
     i32.eq
     i32.or
     local.get $2
     i32.const 32
     i32.ge_u
     i32.or
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/upperPathVariantData
     local.tee $2
     i32.store
     local.get $2
     local.get $4
     i32.add
     i32.load8_s
     i32.const 0
     i32.ge_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/upperPathHeightData
      local.tee $2
      i32.store
      local.get $2
      local.get $4
      i32.add
      i32.load8_u
      local.set $2
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/upperPathVariantData
      local.tee $3
      i32.store
      local.get $3
      local.get $4
      i32.add
      i32.const 255
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/upperPathHeightData
      local.tee $3
      i32.store
      local.get $3
      local.get $4
      i32.add
      i32.const 0
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/upperRampDirData
      local.tee $3
      i32.store
      local.get $3
      local.get $4
      i32.add
      i32.const 0
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/pathLevelData
      local.tee $3
      i32.store
      local.get $0
      local.get $1
      local.get $2
      call $assembly/sim/behavior/navigation/nodeIndex
      local.get $3
      i32.add
      i32.const 255
      i32.store8
      global.get $~lib/memory/__stack_pointer
      global.get $assembly/sim/state/gridState/pathLevelRampData
      local.tee $3
      i32.store
      local.get $0
      local.get $1
      local.get $2
      call $assembly/sim/behavior/navigation/nodeIndex
      local.get $3
      i32.add
      i32.const 0
      i32.store8
      i32.const 5
      call $assembly/sim/economy/economy/earn
      local.get $0
      local.get $1
      call $assembly/sim/grid/gridOps/recomputeRamp
      local.get $0
      local.get $1
      call $assembly/sim/grid/gridOps/recomputeNeighborRamps
      local.get $0
      local.get $1
      call $assembly/sim/grid/gridOps/recomputeNeighborUpperRamps
      local.get $0
      local.get $1
      local.get $2
      call $assembly/sim/grid/gridOps/recomputeNeighborPathLevelRamps
      br $folding-inner1
     end
     local.get $0
     local.get $1
     i32.const 0
     call $assembly/sim/grid/gridOps/setTile
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/parkState/pukeData
     local.tee $2
     i32.store
     local.get $1
     i32.const 50
     i32.mul
     local.get $0
     i32.add
     local.tee $3
     local.get $2
     i32.add
     i32.const 0
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/rampDirData
     local.tee $2
     i32.store
     local.get $2
     local.get $3
     i32.add
     i32.const 0
     i32.store8
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/upperRampDirData
     local.tee $2
     i32.store
     local.get $2
     local.get $3
     i32.add
     i32.const 0
     i32.store8
     i32.const 5
     call $assembly/sim/economy/economy/earn
     local.get $0
     local.get $1
     call $assembly/sim/grid/gridOps/recomputeNeighborRamps
     local.get $0
     local.get $1
     call $assembly/sim/grid/gridOps/recomputeNeighborUpperRamps
     br $folding-inner1
    end
    local.get $0
    local.get $1
    local.get $2
    call $assembly/sim/behavior/navigation/nodeIndex
    local.set $3
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $4
    i32.store
    local.get $3
    local.get $4
    i32.add
    i32.load8_s
    i32.const 0
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelData
    local.tee $4
    i32.store
    local.get $3
    local.get $4
    i32.add
    i32.const 255
    i32.store8
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelRampData
    local.tee $4
    i32.store
    local.get $3
    local.get $4
    i32.add
    i32.const 0
    i32.store8
    i32.const 5
    call $assembly/sim/economy/economy/earn
    local.get $0
    local.get $1
    local.get $2
    call $assembly/sim/grid/gridOps/recomputeNeighborPathLevelRamps
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 1
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $assembly/sim/placement/placement/getPathAtHeight (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   local.get $1
   i32.or
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   local.get $2
   i32.const 0
   i32.lt_s
   local.get $2
   i32.const 9
   i32.ge_s
   i32.or
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/heightData
   local.tee $3
   i32.store
   local.get $2
   local.get $3
   local.get $1
   i32.const 50
   i32.mul
   local.get $0
   i32.add
   local.tee $3
   i32.add
   i32.load8_u
   i32.eq
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/gridData
    local.tee $0
    i32.store
    local.get $0
    local.get $3
    i32.add
    i32.load8_u
    local.tee $0
    call $assembly/sim/grid/gridOps/isPathTile
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $0
     i32.const 1
     i32.sub
     i32.const 255
     i32.and
     return
    end
    local.get $0
    i32.const 9
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 0
     return
    end
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   global.get $assembly/sim/state/gridState/pathLevelData
   local.tee $3
   i32.store
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/behavior/navigation/nodeIndex
   local.get $3
   i32.add
   i32.load8_s
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $assembly/sim/placement/placement/getPathLevelRampDir (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner1
   local.get $0
   local.get $1
   i32.or
   i32.const 0
   i32.lt_s
   local.get $0
   i32.const 50
   i32.ge_s
   i32.or
   local.get $1
   i32.const 50
   i32.ge_s
   i32.or
   local.get $2
   i32.const 0
   i32.lt_s
   local.get $2
   i32.const 9
   i32.ge_s
   i32.or
   i32.or
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/heightData
    local.tee $3
    i32.store
    local.get $2
    local.get $3
    local.get $1
    i32.const 50
    i32.mul
    local.get $0
    i32.add
    local.tee $3
    i32.add
    i32.load8_u
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/rampDirData
     local.tee $0
     i32.store
     local.get $0
     local.get $3
     i32.add
     i32.load8_s
     local.set $0
     br $folding-inner1
    end
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/sim/state/gridState/pathLevelRampData
    local.tee $3
    i32.store
    local.get $0
    local.get $1
    local.get $2
    call $assembly/sim/behavior/navigation/nodeIndex
    local.get $3
    i32.add
    i32.load8_s
    local.set $0
    br $folding-inner1
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/placement/placement/getPathLevelCount (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  local.get $1
  i32.or
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/gridData
  local.tee $2
  i32.store
  i32.const 1
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.tee $4
  local.get $2
  i32.add
  i32.load8_u
  local.tee $2
  i32.const 9
  i32.eq
  local.get $2
  call $assembly/sim/grid/gridOps/isPathTile
  select
  i32.eqz
  i32.eqz
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $5
  i32.store
  local.get $4
  local.get $5
  i32.add
  i32.load8_u
  local.set $4
  loop $for-loop|0
   local.get $3
   i32.const 9
   i32.lt_s
   if
    local.get $3
    local.get $4
    i32.ne
    if
     global.get $~lib/memory/__stack_pointer
     global.get $assembly/sim/state/gridState/pathLevelData
     local.tee $5
     i32.store
     local.get $2
     i32.const 1
     i32.add
     local.get $2
     local.get $0
     local.get $1
     local.get $3
     call $assembly/sim/behavior/navigation/nodeIndex
     local.get $5
     i32.add
     i32.load8_s
     i32.const 0
     i32.ge_s
     select
     local.set $2
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/sim/placement/placement/isBridge (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  local.get $1
  i32.or
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $3
  i32.store
  local.get $2
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $3
  i32.add
  i32.load8_u
  i32.gt_s
  if (result i32)
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/placement/placement/getPathAtHeight
   i32.const 0
   i32.ge_s
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/sim/placement/placement/isTunnel (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  local.get $1
  i32.or
  i32.const 0
  i32.lt_s
  local.get $0
  i32.const 50
  i32.ge_s
  i32.or
  local.get $1
  i32.const 50
  i32.ge_s
  i32.or
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/sim/state/gridState/heightData
  local.tee $3
  i32.store
  local.get $2
  local.get $1
  i32.const 50
  i32.mul
  local.get $0
  i32.add
  local.get $3
  i32.add
  i32.load8_u
  i32.lt_s
  if (result i32)
   local.get $0
   local.get $1
   local.get $2
   call $assembly/sim/placement/placement/getPathAtHeight
   i32.const 0
   i32.ge_s
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<u8>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1104
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 4
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<i8>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1104
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<i32>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1056
   i32.const 1104
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 2
  i32.shl
  i32.const 6
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/rt/__newArray (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.const 1
  local.get $0
  call $~lib/rt/__newBuffer
  local.tee $2
  i32.store
  i32.const 16
  i32.const 8
  call $~lib/rt/itcms/__new
  local.tee $3
  local.get $2
  i32.store
  local.get $2
  if
   local.get $3
   i32.eqz
   if
    i32.const 0
    i32.const 1232
    i32.const 295
    i32.const 14
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/rt/itcms/white
   local.get $2
   i32.const 20
   i32.sub
   local.tee $0
   i32.load offset=4
   i32.const 3
   i32.and
   i32.eq
   if
    local.get $3
    i32.const 20
    i32.sub
    i32.load offset=4
    i32.const 3
    i32.and
    local.tee $1
    global.get $~lib/rt/itcms/white
    i32.eqz
    i32.eq
    if
     local.get $0
     call $~lib/rt/itcms/Object#makeGray
    else
     global.get $~lib/rt/itcms/state
     i32.const 1
     i32.eq
     local.get $1
     i32.const 3
     i32.eq
     i32.and
     if
      local.get $0
      call $~lib/rt/itcms/Object#makeGray
     end
    end
   end
  end
  local.get $3
  local.get $2
  i32.store offset=4
  local.get $3
  i32.const 32
  i32.store offset=8
  local.get $3
  i32.const 8
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
)
