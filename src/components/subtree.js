import React from 'react'

// props:
//      objects:        objects in forest
//      object:         root
//      toggleExpanded: callback
//      Label:          component which generates a label for an object (props.object contains object to render)
//      Right:          component which generates right-hand side for an object (props.object contains object to render)
//      rowNumber:      tracks current row across multiple calls for alternating line colors
//      indent:         current indention level
function Subtree(props) {
    let {
        objects,
        object,
        toggleExpanded = object => { },
        Label = ({object}) => <span>Need a label</span>,
        Right = ({object}) => <span />,
        rowNumber = { value: 0 },
        indent = 0,
    } = props;

    return (
        <div>
            <div style={{
                backgroundColor: ((rowNumber.value)++ & 1) ? 'cyan' : 'LightCyan',
            }}>
                <span style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginLeft: indent,
                }}>
                    <div>
                        <i
                            onClick={() => toggleExpanded(object)}
                            className={!object.children.length ? '' : object.expanded ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o'} />
                        &nbsp;
                            <Label object={object} />
                    </div>
                    <Right object={object} />
                </span>
            </div>
            <div>
                {
                    object.expanded ? object.children.map(childId => {
                        let child = objects.find(child => child.id == childId);
                        return (
                            <Subtree key={childId}  {...{ objects, object: child, toggleExpanded, Label, Right, rowNumber, indent: indent + 30 }} />
                        )
                    }) : undefined
                }
            </div>
        </div>
    )
};

export default Subtree;
