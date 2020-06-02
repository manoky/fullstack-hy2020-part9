/* eslint-disable @typescript-eslint/no-explicit-any */
import { Discharge, SickLeave } from '../types';

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isDischarage = (discharge: Discharge): boolean => {
  const disArr = Object.values(discharge);
  return disArr.some(d => isDate(d)) && disArr.some(d => isString(d));
};

export const isSickLeave = (leave: SickLeave): boolean => {
  return Object.values(leave).every(sl => isDate(sl));
};