import { Router } from "express";

export interface ModuleType<Exports, Service> {
	route: string;
	router: Router;
	service: Service;
	exports: Exports;
}
