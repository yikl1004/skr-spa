import { Middleware } from '@reduxjs/toolkit'
import reduxLogger from 'redux-logger'
/**
 * @title custom middleware
 * @example
 *
 * const loggerMiddleware: Middleware = () => (next) => (action) => {
 *      return next(action)
 * }
 */

const loggerMiddleware: Middleware = () => (next) => (action) => {
	return next(action)
}

export default [reduxLogger, loggerMiddleware]
