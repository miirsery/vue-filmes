import { Request, Response, NextFunction, Application } from 'express'

export type MiddlewareFunctionType = (req: Request, res: Response, next: NextFunction) => void

export type RequestType = Request
export type ResponseType = Response
export type ApplicationType = Application
export type NextFunctionType = NextFunction
