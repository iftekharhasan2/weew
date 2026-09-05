import React from 'react';
import MediaField from './MediaField';

interface ImageFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  helpText?: string;
  folder?: string;
}

/**
 * Kept as a named component because the CMS panels use it in a dozen places.
 * It is now a thin image-flavoured wrapper over MediaField, which uploads to
 * the CDN instead of inlining base64 into the database.
 */
export const ImageField: React.FC<ImageFieldProps> = (props) => (
  <MediaField {...props} kind="image" />
);

export default ImageField;
