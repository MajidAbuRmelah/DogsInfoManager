import API from "../models/API";
import APITypeEnum from "./APITypeEnum";

const EndPoint = "https://dogsinfomanager-backend-workload-eb3js8axwwqyy.cpln.app";
const AddDog = new API(EndPoint + "/dog", APITypeEnum.POST);
const UpdateDog = new API(EndPoint + "/dog", APITypeEnum.PUT);
const GetDogs = new API(EndPoint + "/dogs", APITypeEnum.GET);
const GetDog = new API(EndPoint + "/dog", APITypeEnum.GET);
const DeleteDog = new API(EndPoint + "/dog", APITypeEnum.DELETE);

export { AddDog, UpdateDog, GetDogs, GetDog, DeleteDog }