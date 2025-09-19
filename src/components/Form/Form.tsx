'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './Form.module.css';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={clsx(styles.form, className)} {...props}>
      {children}
    </form>
  );
}

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
      {children}
    </div>
  );
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={clsx(
          styles.input,
          {
            [styles.error]: error,
          },
          className
        )}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <div className={styles.inputWrapper}>
      <textarea
        className={clsx(
          styles.textarea,
          {
            [styles.error]: error,
          },
          className
        )}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  children: React.ReactNode;
}

export function Select({ error, className, children, ...props }: SelectProps) {
  return (
    <div className={styles.inputWrapper}>
      <select
        className={clsx(
          styles.select,
          {
            [styles.error]: error,
          },
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  return (
    <div className={styles.formError}>
      {message}
    </div>
  );
}

