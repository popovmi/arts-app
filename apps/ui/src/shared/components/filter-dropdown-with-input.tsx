import { Button, Col, Input, Row } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';

let timer: NodeJS.Timer;

export const FilterDropdownWithInput = ({
  confirm,
  setSelectedKeys,
  selectedKeys,
  clearFilters,
}: FilterDropdownProps) => {
  const clear = clearFilters!;

  useEffect(() => {}, [selectedKeys]);

  const startTimer = (value: string) => {
    timer = setTimeout(() => {
      if (!value) {
        clear();
        confirm({ closeDropdown: false });

        return;
      }

      confirm({ closeDropdown: false });
    }, 800);
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setSelectedKeys([value]);
    clearTimeout(timer);
    startTimer(value);
  };

  return (
    <Row gutter={[4, 4]} style={{ padding: 4, width: 200 }}>
      <Col xs={24}>
        <Input onChange={handleInputChange} value={selectedKeys[0]} />
      </Col>
      <Col xs={24} style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          type='link'
          size='small'
          disabled={!selectedKeys[0]}
          onClick={evt => {
            clear();
            confirm({ closeDropdown: true });
          }}>
          Сбросить
        </Button>
      </Col>
    </Row>
  );
};
