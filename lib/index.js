'use strict';var _typeof=typeof Symbol==="function"&&typeof (typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Timer=function(){function Timer(){_classCallCheck(this,Timer);this.
timeouts=new Map();this.
intervals=new Map();this.
immediates=new Map();this.
animationFrames=new Map();this.

contextTimers=new WeakMap();}_createClass(Timer,[{key:'setTimeout',value:function setTimeout()

{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._setTimeoutContext.apply(this,arguments);}else 
{
return this._setTimeoutVanilla.apply(this,arguments);}}},{key:'_setTimeoutContext',value:function _setTimeoutContext(



ctx,name,fn,interval){
if(!this.contextTimers.has(ctx)){
this.contextTimers.set(ctx,new Timer());}


this.contextTimers.get(ctx).setTimeout(name,fn,interval);

return this;}},{key:'_setTimeoutVanilla',value:function _setTimeoutVanilla(


name,fn,interval){var _this=this;
this.clearTimeout(name);
this.timeouts.set(name,setTimeout(function(){
fn();
_this.clearTimeout(name);},
interval));

return this;}},{key:'clearTimeout',value:function clearTimeout()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._clearTimeoutContext.apply(this,arguments);}else 
{
return this._clearTimeoutVanilla.apply(this,arguments);}}},{key:'_clearTimeoutContext',value:function _clearTimeoutContext(



ctx){var _this2=this;
if(!this.contextTimers.has(ctx)){
return this;}for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}


if(args.length===0){
Array.from(this.contextTimers.get(ctx).timeouts.keys()).forEach(function(timeout){
_this2.contextTimers.get(ctx).clearTimeout(timeout);});}else 

{var 
timeout=args[0];
this.contextTimers.get(ctx).clearTimeout(timeout);}


return this;}},{key:'_clearTimeoutVanilla',value:function _clearTimeoutVanilla(


name){
if(this.timeouts.has(name)){
clearTimeout(this.timeouts.get(name));
this.timeouts.delete(name);}


return this;}},{key:'timeoutExists',value:function timeoutExists()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._timeoutExistsContext.apply(this,arguments);}else 
{
return this._timeoutExistsVanilla.apply(this,arguments);}}},{key:'_timeoutExistsContext',value:function _timeoutExistsContext(



ctx,name){
return this.contextTimers.has(ctx)&&this.contextTimers.get(ctx).timeouts.has(name);}},{key:'_timeoutExistsVanilla',value:function _timeoutExistsVanilla(


name){
return this.timeouts.has(name);}},{key:'setInterval',value:function setInterval()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._setIntervalContext.apply(this,arguments);}else 
{
return this._setIntervalVanilla.apply(this,arguments);}}},{key:'_setIntervalContext',value:function _setIntervalContext(



ctx,name,fn,interval){
if(!this.contextTimers.has(ctx)){
this.contextTimers.set(ctx,new Timer());}


this.contextTimers.get(ctx).setInterval(name,fn,interval);

return this;}},{key:'_setIntervalVanilla',value:function _setIntervalVanilla(


name,fn,interval){
this.clearInterval(name);
this.intervals.set(name,setInterval(fn,interval));
return this;}},{key:'clearInterval',value:function clearInterval()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._clearIntervalContext.apply(this,arguments);}else 
{
return this._clearIntervalVanilla.apply(this,arguments);}}},{key:'_clearIntervalContext',value:function _clearIntervalContext(



ctx){var _this3=this;
if(!this.contextTimers.has(ctx)){
return this;}for(var _len2=arguments.length,args=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}


if(args.length===0){
Array.from(this.contextTimers.get(ctx).intervals.keys()).forEach(function(interval){
_this3.contextTimers.get(ctx).clearInterval(interval);});}else 

{var 
interval=args[0];
this.contextTimers.get(ctx).clearInterval(interval);}


return this;}},{key:'_clearIntervalVanilla',value:function _clearIntervalVanilla(


name){
if(this.intervals.has(name)){
clearInterval(this.intervals.get(name));
this.intervals.delete(name);}


return this;}},{key:'intervalExists',value:function intervalExists()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._intervalExistsContext.apply(this,arguments);}else 
{
return this._intervalExistsVanilla.apply(this,arguments);}}},{key:'_intervalExistsContext',value:function _intervalExistsContext(



ctx,name){
return this.contextTimers.has(ctx)&&this.contextTimers.get(ctx).intervals.has(name);}},{key:'_intervalExistsVanilla',value:function _intervalExistsVanilla(


name){
return this.intervals.has(name);}},{key:'setImmediate',value:function setImmediate()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._setImmediateContext.apply(this,arguments);}else 
{
return this._setImmediateVanilla.apply(this,arguments);}}},{key:'_setImmediateContext',value:function _setImmediateContext(



ctx,name,fn){
if(!this.contextTimers.has(ctx)){
this.contextTimers.set(ctx,new Timer());}


this.contextTimers.get(ctx).setImmediate(name,fn);

return this;}},{key:'_setImmediateVanilla',value:function _setImmediateVanilla(


name,fn){var _this4=this;
this.clearImmediate(name);
this.immediates.set(name,setImmediate(function(){
fn();
_this4.clearImmediate(name);}));


return this;}},{key:'clearImmediate',value:function clearImmediate()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._clearImmediateContext.apply(this,arguments);}else 
{
return this._clearImmediateVanilla.apply(this,arguments);}}},{key:'_clearImmediateContext',value:function _clearImmediateContext(



ctx){var _this5=this;
if(!this.contextTimers.has(ctx)){
return this;}for(var _len3=arguments.length,args=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){args[_key3-1]=arguments[_key3];}


if(args.length===0){
Array.from(this.contextTimers.get(ctx).immediates.keys()).forEach(function(immediate){
_this5.contextTimers.get(ctx).clearImmediate(immediate);});}else 

{var 
immediate=args[0];
this.contextTimers.get(ctx).clearImmediate(immediate);}


return this;}},{key:'_clearImmediateVanilla',value:function _clearImmediateVanilla(


name){
if(this.immediates.has(name)){
clearImmediate(this.immediates.get(name));
this.immediates.delete(name);}


return this;}},{key:'immediateExists',value:function immediateExists()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._immediateExistsContext.apply(this,arguments);}else 
{
return this._immediateExistsVanilla.apply(this,arguments);}}},{key:'_immediateExistsContext',value:function _immediateExistsContext(



ctx,name){
return this.contextTimers.has(ctx)&&this.contextTimers.immediates.has(name);}},{key:'_immediateExistsVanilla',value:function _immediateExistsVanilla(


name){
return this.immediates.has(name);}},{key:'requestAnimationFrame',value:function requestAnimationFrame()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._requestAnimationFrameContext.apply(this,arguments);}else 
{
return this._requestAnimationFrameVanilla.apply(this,arguments);}}},{key:'_requestAnimationFrameContext',value:function _requestAnimationFrameContext(



ctx,name,fn){
if(!this.contextTimers.has(ctx)){
this.contextTimers.set(ctx,new Timer());}


this.contextTimers.get(ctx).requestAnimationFrame(name,fn);

return this;}},{key:'_requestAnimationFrameVanilla',value:function _requestAnimationFrameVanilla(


name,fn){var _this6=this;
this.cancelAnimationFrame(name);
this.animationFrames.set(name,requestAnimationFrame(function(){
fn();
_this6.cancelAnimationFrame(name);}));


return this;}},{key:'cancelAnimationFrame',value:function cancelAnimationFrame()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._cancelAnimationFrameContext.apply(this,arguments);}else 
{
return this._cancelAnimationFrameVanilla.apply(this,arguments);}}},{key:'_cancelAnimationFrameContext',value:function _cancelAnimationFrameContext(



ctx){var _this7=this;
if(!this.contextTimers.has(ctx)){
return this;}for(var _len4=arguments.length,args=Array(_len4>1?_len4-1:0),_key4=1;_key4<_len4;_key4++){args[_key4-1]=arguments[_key4];}


if(args.length===0){
Array.from(this.contextTimers.get(ctx).animationFrames.keys()).forEach(function(animationFrame){
_this7.contextTimers.get(ctx).cancelAnimationFrame(animationFrame);});}else 

{var 
animationFrame=args[0];
this.contextTimers.get(ctx).cancelAnimationFrame(animationFrame);}


return this;}},{key:'_cancelAnimationFrameVanilla',value:function _cancelAnimationFrameVanilla(


name){
if(this.animationFrames.has(name)){
cancelAnimationFrame(this.animationFrames.get(name));
this.animationFrames.delete(name);}


return this;}},{key:'animationFrameExists',value:function animationFrameExists()


{
if(_typeof(arguments.length<=0?undefined:arguments[0])==='object'){
return this._animationFrameExistsContext.apply(this,arguments);}else 
{
return this._animationFrameExistsVanilla.apply(this,arguments);}}},{key:'_animationFrameExistsContext',value:function _animationFrameExistsContext(



ctx,name){
return this.contextTimers.has(ctx)&&this.contextTimers.get(ctx).animationFrames.has(name);}},{key:'_animationFrameExistsVanilla',value:function _animationFrameExistsVanilla(


name){
return this.animationFrames.has(name);}}]);return Timer;}();



module.exports=new Timer();