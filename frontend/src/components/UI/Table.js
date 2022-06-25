import React, {useState} from "react";
import _ from "lodash";

function Table({ordersData, sortColumn, columns, oSelectedOrder, orderClickHandler}) {
    const [sort, setSort] = useState(sortColumn[0]);

    const setSortColumn = (field) => {
        const newSort = sortColumn[1](field);
        setSort(newSort);
    }

    return (
        <table className='orders-table'>
            <TableHead onClickHandler = { setSortColumn } sort={ sort }/>
            <TableBody orders = { ordersData } sort={ sort }/>
        </table>
    );

    function TableHead({onClickHandler, sort}) {
        return (
            <thead>
                <tr>
                    {_.map(columns, (column, index) => {
                        return (
                            <th
                                className={_.get(column, 'className')}
                                style={{width: _.get(column, 'width')}}
                                key={index}
                                onClick={() => {
                                    onClickHandler(_.get(column, 'field'))
                                }}
                            >
                                <div>
                                    {_.get(column, 'name')}
                                    {_.isEqual(_.get(column, 'field'), _.get(sort, 0)) &&
                                        <span className={'sort sort--' + _.get(sort, 1)}>
                                        <i className='material-icons'>arrow_drop_down</i>
                                    </span>
                                    }
                                </div>
                            </th>
                        )
                    })}
                </tr>
            </thead>
        );
    }

    function TableBody({orders, sort}) {
        orders = _.orderBy(orders, (oOrder) => _.get(oOrder, _.get(sort, 0)), _.get(sort, 1));
        return (
            <tbody>
            {
                orders.map(order => {
                    try {
                        return (
                            <TableRow key={_.get(order, 'order_id')} order={order} columns={columns}/>
                        )
                    } catch (e) {
                        console.error(e);
                        console.error('Orders Error', order);
                        return false;
                    }
                })
            }
            </tbody>
        );
    }

    function TableRow({order, columns}) {
        return (
            <tr
                className={_.isEqual(oSelectedOrder, order) ? 'active' : ''}
                key={_.get(order, 'order_id')}
                onClick={() => {
                    orderClickHandler(_.get(order, 'order_id'))
                }}
            >
                {_.map(columns, (column, index) => <TableColumn key={index} order={order} column={column}/>)}
            </tr>
        );
    }

    function TableColumn({order, column}) {
        let value = _.get(order, _.get(column, 'field'));
        let additionalValue = [];

        if (column.modifyValue) {
            value = column.modifyValue(value);
        }
        const className = typeof column.class === 'function' ? column.class(value) : column.class;

        if (column.additional) {
            _.each(column.additional, additional => {
                additionalValue.push(
                    <span key={_.toString(_.get(additional, 'field'))}>
                        &nbsp;{_.get(order, _.get(additional, 'field'))}
                    </span>
                )
            });
        }
        return (
            <td>
                <span className={className}>{value}</span>{additionalValue}
            </td>
        )
    }
}

export default Table;